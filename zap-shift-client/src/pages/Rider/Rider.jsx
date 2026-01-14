import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useLoaderData } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const Rider = () => {

  const {
    register,
    handleSubmit,
    control,
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();

  // Generate unique region list
  const regions = [...new Set(serviceCenters.map(c => c.region))];

  // Get district list by region
  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter(
      (c) => c.region === region
    );
    return regionDistricts.map((d) => d.district);
  };

  // watch selected region (THIS FIXES THE DROPDOWN ISSUE)
  const riderRegion = useWatch({
    control,
    name: 'Region',
  });

  const handleRiderApplication = (data) => {
    //console.log(data);

    axiosSecure.post('/riders',data)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your application has been submitted. We will reach out in 14 days",
            showConfirmButton: false,
            timer: 2100
          });
        }
      });
  };

  return (
    <form
      onSubmit={handleSubmit(handleRiderApplication)}
      className="mt-12 p-4 text-black"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Rider Details */}
        <div>
          <h4 className="text-2xl font-semibold mb-4">Rider Details</h4>

          <fieldset className="fieldset">

            <label className="label">Rider Name</label>
            <input
              type="text"
              {...register('name')}
              defaultValue={user.displayName}
              className="input w-full"
              placeholder="Name"
            />

            <label className="label">Email</label>
            <input
              type="text"
              {...register('email')}
              defaultValue={user?.email}
              className="input w-full"
              placeholder="Email"
            />

            {/* Region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Your Region</legend>
              <select
                {...register('Region')}
                defaultValue=""
                className="select"
              >
                <option disabled value="">Pick a Region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>{r}</option>
                ))}
              </select>
            </fieldset>

            {/* District */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">District</legend>
              <select
                {...register('district')}
                defaultValue=""
                className="select"
              >
                <option disabled value="">Pick a District</option>

                {riderRegion &&
                  districtsByRegion(riderRegion).map((d, i) => (
                    <option key={i} value={d}>{d}</option>
                  ))
                }
              </select>
            </fieldset>

            <label className="label mt-4">Your Address</label>
            <input
              type="text"
              {...register('Address')}
              className="input w-full"
              placeholder="Your Address"
            />

          </fieldset>
        </div>

        {/* More Details */}
        <fieldset className="fieldset">
          <h4 className="text-2xl font-semibold mb-4">More Details</h4>

          <label className="label">Driving License</label>
          <input
            type="text"
            {...register('license')}
            className="input w-full"
            placeholder="Driving License"
          />

          <label className="label">NID</label>
          <input
            type="text"
            {...register('NID')}
            className="input w-full"
            placeholder="NID"
          />

          <label className="label mt-4">Bike</label>
          <input
            type="text"
            {...register('bike')}
            className="input w-full"
            placeholder="Bike"
          />

        </fieldset>

      </div>

      <input
        type="submit"
        className="btn btn-primary text-black"
        value="Apply as a Rider"
      />
    </form>
  );
};

export default Rider;
