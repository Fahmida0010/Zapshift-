const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const admin = require("firebase-admin");
const serviceAccount = require("./serviceKey.json");
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

// middleware
app.use(express.json());
//app.use(cors());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://zapshift-client.vercel.app",
  ],
  credentials: true,
}));


// verify Firebase Token
const verifyFBToken = async (req, res, next) => {
  console.log('header in middleware:', req.headers.authorization);

  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: 'unauthorized access' });
  }

  try {
    const idToken = token.split(' ')[1];
    const decoded = await admin.auth().verifyIdToken(idToken);
    console.log('decoded:', decoded);

    req.decoded_email = decoded.email;
    return next();
  } catch (err) {
    return res.status(401).send({ message: 'unauthorized access' });
  }
};

// DB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dtpqtsr.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Generate Tracking ID
function generateTrackingId() {
  return "ZAP-" + Math.random().toString(36).substring(2, 10).toUpperCase();
}
async function run() {
  try {
    await client.connect();

    const db = client.db('zap_shift_db');
    const usersCollection = db.collection('users');
    const parcelCollection = db.collection('parcels');
    const paymentCollection = db.collection('payments');
    const ridersCollection = db.collection('riders');
    const trackingsCollection = db.collection('trackings');

    // Verify Admin Role
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded_email;
      const user = await usersCollection.findOne({ email });

      if (!user || user.role !== 'admin') {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

    // Verify Rider Role
    const verifyRider = async (req, res, next) => {
      const email = req.decoded_email;
      const user = await usersCollection.findOne({ email });

      if (!user || user.role !== 'rider') {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

    // Log Tracking Activity
    const logTracking = async (trackingId, status) => {
      const log = {
        trackingId,
        status,
        details: status.split('_').join(' '),
        createdAt: new Date()
      };
      return await trackingsCollection.insertOne(log);
    };

    // -----------------------------
    // USERS APIs
    // -----------------------------

    // GET All Users
    app.get('/users', verifyFBToken, async (req, res) => {
      const searchText = req.query.searchText;
      const query = {};

      if (searchText) {
        query.$or = [
          { displayName: { $regex: searchText, $options: 'i' } },
          { email: { $regex: searchText, $options: 'i' } }
        ];
      }

      const cursor = usersCollection
        .find(query)
        .sort({ createdAt: -1 })
        .limit(5);

      const result = await cursor.toArray();
      res.send(result);
    });

    // GET User Role
    app.get('/users/:email/role', async (req, res) => {
      const email = req.params.email;
      const user = await usersCollection.findOne({ email });

      res.send({ role: user?.role || 'user' });
    });

    // Create New User
    app.post('/users', async (req, res) => {
      const user = req.body;
      user.role = 'user';
      user.createdAt = new Date();

      const userExists = await usersCollection.findOne({ email: user.email });

      if (userExists) {
        return res.send({ message: 'user exists' });
      }

      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // Update User Role (Admin Only)
    app.patch('/users/:id/role', verifyFBToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const roleInfo = req.body;

      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: { role: roleInfo.role }
      };

      const result = await usersCollection.updateOne(query, updateDoc);
      res.send(result);
    });
    // -----------------------------
    // PARCELS APIs
    // -----------------------------

    // GET Parcels (optionally by sender email)
    app.get('/parcels', async (req, res) => {
      try {
        const email = req.query.email;
        const query = email ? { senderEmail: email } : {};

        const result = await parcelCollection
          .find(query)
          .sort({ createdAt: -1 })
          .toArray();

        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error fetching parcels", error });
      }
    });

    // GET Parcels for Rider view (filter by riderEmail and 
    // optionally deliveryStatus)
    app.get('/parcels/rider', async (req, res) => {
      try {
        const { riderEmail, deliveryStatus } = req.query;
        const query = {};

        if (riderEmail) query.riderEmail = riderEmail;

        if (!deliveryStatus || deliveryStatus !== 'parcel_delivered') {
          query.deliveryStatus = { $nin: ['parcel_delivered'] };
        } else {
          query.deliveryStatus = deliveryStatus;
        }

        const result = await parcelCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error fetching rider parcels", error });
      }
    });

    // GET Single Parcel
    app.get('/parcels/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const result = await parcelCollection.findOne({ _id: new ObjectId(id) });
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error fetching parcel", error });
      }
    });

    // GET Delivery Status Stats
    app.get('/parcels/delivery-status/stats', async (req, res) => {
      try {
        const pipeline = [
          {
            $group: {
              _id: '$deliveryStatus',
              count: { $sum: 1 }
            }
          },
          {
            $project: {
              status: '$_id',
              count: 1,
              _id: 0
            }
          }
        ];
        const result = await parcelCollection.aggregate(pipeline).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error fetching stats", error });
      }
    });

    // POST Parcel (create)
    app.post('/parcels', async (req, res) => {
      try {
        const parcel = req.body;
        const trackingId = generateTrackingId();

        parcel.createdAt = new Date();
        parcel.trackingId = trackingId;

        await logTracking(trackingId, 'parcel_created');

        const result = await parcelCollection.insertOne(parcel);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Parcel insert failed", error });
      }
    });

    // PATCH assign driver/rider to parcel
    app.patch('/parcels/:id/assign', async (req, res) => {
      try {
        const { riderId, riderName, riderEmail, trackingId } = req.body;
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const updatedDoc = {
          $set: {
            deliveryStatus: 'driver_assigned',
            riderId,
            riderName,
            riderEmail
          }
        };

        const result = await parcelCollection.updateOne(query, updatedDoc);

        // update rider information
        if (riderId) {
          const riderQuery = { _id: new ObjectId(riderId) };
          const riderUpdateDoc = { $set: { workStatus: 'in_delivery' } };
          await ridersCollection.updateOne(riderQuery, riderUpdateDoc);
        }

        // log tracking
        if (trackingId) await logTracking(trackingId, 'driver_assigned');

        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Assign rider failed", error });
      }
    });

    // PATCH change parcel status (including delivered)
    app.patch('/parcels/:id/status', async (req, res) => {
      try {
        const { deliveryStatus, riderId, trackingId } = req.body;
        const parcelId = req.params.id;
        const query = { _id: new ObjectId(parcelId) };

        const updateDoc = {
          $set: { deliveryStatus }
        };

        if (deliveryStatus === 'parcel_delivered' && riderId) {
          const riderQuery = { _id: new ObjectId(riderId) };
          const riderUpdateDoc = { $set: { workStatus: 'available' } };
          await ridersCollection.updateOne(riderQuery, riderUpdateDoc);
        }

        const result = await parcelCollection.updateOne(query, updateDoc);

        // log tracking
        if (trackingId) await logTracking(trackingId, deliveryStatus);

        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Update parcel status failed", error });
      }
    });

    // DELETE Parcel
    app.delete('/parcels/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const result = await parcelCollection.deleteOne({ _id: new ObjectId(id) });
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Delete failed", error });
      }
    });

    // -----------------------------
    // STRIPE CHECKOUT SESSION
    // -----------------------------
    app.post('/payment-checkout-session', async (req, res) => {
      try {
        const parcelInfo = req.body; // expect { cost, parcelName, parcelId, trackingId, senderEmail }
        const amount = parseInt(parcelInfo.cost, 10) * 100;

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'payment',
          line_items: [
            {
              price_data: {
                currency: 'usd',
                unit_amount: amount,
                product_data: { name: parcelInfo.parcelName || 'Parcel Payment' }
              },
              quantity: 1,
            }
          ],
          metadata: {
            parcelId: parcelInfo.parcelId,
            trackingId: parcelInfo.trackingId,
            parcelName: parcelInfo.parcelName
          },
          customer_email: parcelInfo.senderEmail,
          success_url: `${process.env.SITE_DOMAIN}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.SITE_DOMAIN}/dashboard/payment-cancelled`
        });

        res.send({ url: session.url });
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Stripe session failed", error });
      }
    });

    // -----------------------------
    // PAYMENT APIs
    // -----------------------------
    app.get('/payments', verifyFBToken, async (req, res) => {
      try {
        const email = req.query.email;
        const query = {};

        if (email) {
          if (email !== req.decoded_email) {
            return res.status(403).send({ message: 'forbidden access' });
          }
          query.customerEmail = email;
        }

        const cursor = paymentCollection.find(query).sort({ paidAt: -1 });
        const result = await cursor.toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error fetching payments", error });
      }
    });

    // -----------------------------
    // RIDER APIs
    // -----------------------------
    app.get('/riders', async (req, res) => {
      try {
        const { status, district, workStatus } = req.query;
        const query = {};
        if (status) query.status = status;
        if (district) query.district = district;
        if (workStatus) query.workStatus = workStatus;

        const result = await ridersCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error fetching riders", error });
      }
    });

    // Rider delivery per day aggregate
    app.get('/rider/delivery-per-day', async (req, res) => {
      try {
        const email = req.query.email;
        const pipeline = [
          {
            $match: {
              riderEmail: email,
              deliveryStatus: "parcel_delivered"
            }
          },
          {
            $lookup: {
              from: "trackings",
              localField: "trackingId",
              foreignField: "trackingId",
              as: "parcel_trackings"
            }
          },
          { $unwind: "$parcel_trackings" },
          {
            $match: { "parcel_trackings.status": "parcel_delivered" }
          },
          {
            $group: {
              _id: {
                date: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$parcel_trackings.createdAt"
                  }
                }
              },
              totalDelivered: { $sum: 1 }
            }
          }
        ];

        const result = await parcelCollection.aggregate(pipeline).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error aggregating deliveries", error });
      }
    });

    // POST rider (apply)
    app.post('/riders', async (req, res) => {
      try {
        const rider = req.body;
        rider.status = 'pending';
        rider.createdAt = new Date();
        const result = await ridersCollection.insertOne(rider);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error creating rider", error });
      }
    });

    // PATCH rider status (admin only)
    app.patch('/riders/:id', verifyFBToken, verifyAdmin, async (req, res) => {
      try {
        const status = req.body.status;
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            status,
            workStatus: 'available'
          }
        };

        const result = await ridersCollection.updateOne(query, updateDoc);

        if (status === 'approved') {
          const email = req.body.email;
          if (email) {
            const userQuery = { email };
            const updateUser = { $set: { role: 'rider' } };
            await usersCollection.updateOne(userQuery, updateUser);
          }
        }

        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error updating rider", error });
      }
    });

    // -----------------------------
    // TRACKING APIs
    // -----------------------------
    app.get('/tracking/:trackingId/logs', async (req, res) => {
      try {
        const trackingId = req.params.trackingId;
        const result = await trackingsCollection.find({ trackingId }).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error fetching tracking logs", error });
      }
    });

    // -----------------------------
    // PAYMENT SUCCESS (polling-friendly alternative to webhook)
    // -----------------------------
    app.patch('/payment-success', async (req, res) => {
      try {
        const sessionId = req.query.session_id;
        if (!sessionId) return res.status(400).send({ message: "session_id required" });

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        const transactionId = session.payment_intent;
        const existing = await paymentCollection.findOne({ transactionId });

        if (existing) {
          return res.send({
            message: 'already exists',
            transactionId,
            trackingId: existing.trackingId
          });
        }

        const metadata = session.metadata || {};
        const parcelId = metadata.parcelId;
        const trackingId = metadata.trackingId;

        // Update parcel to mark paid and pending pickup
        if (parcelId) {
          await parcelCollection.updateOne(
            { _id: new ObjectId(parcelId) },
            {
              $set: {
                paymentStatus: "paid",
                deliveryStatus: 'pending-pickup'
              }
            }
          );
        }

        // Insert payment record
        const payment = {
          amount: (session.amount_total || 0) / 100,
          currency: session.currency || 'usd',
          customerEmail: session.customer_email,
          parcelId,
          parcelName: metadata.parcelName,
          transactionId: session.payment_intent,
          paymentStatus: session.payment_status,
          paidAt: new Date(),
          trackingId
        };

        const resultPayment = await paymentCollection.insertOne(payment);

        // Log tracking
        if (trackingId) await logTracking(trackingId, 'parcel_paid');

        return res.send({
          success: true,
          trackingId,
          transactionId: session.payment_intent,
          paymentInfo: resultPayment
        });
      } catch (error) {
        console.log("payment-success error:", error);
        res.status(500).send({ message: "Payment success processing failed", error });
      }
    });

    console.log("✔ MongoDB Connected");
  } catch (err) {
    console.error(err);
  }
} // end run()

run().catch(console.dir);

// Root
app.get('/', (req, res) => {
  res.send('zap is shifting!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
