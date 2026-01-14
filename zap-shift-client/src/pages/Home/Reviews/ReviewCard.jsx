import { FaQuoteLeft } from "react-icons/fa";



const ReviewCard = ({ review }) => {
  const { name, designation, comment, image,role } = review;

  return (
    <div className="bg-pink-100 shadow-md hover:shadow-xl transition rounded-xl p-6 border border-gray-100 max-w-md">
      {/* Quote Icon */}
      <div className="text-primary text-3xl mb-4">
        <FaQuoteLeft className="text-primary
        text-2xl mb-4 opacity-70" />
      </div>

      {/* Review Message */}
      <p className="text-gray-600 leading-relaxed mb-6">
        {comment}
      </p>


      {/* Reviewer Info */}
      <div className="flex items-center gap-4">
        <div className="avatar">
          <div className="w-12 h-12 rounded-full ring ring-primary/30 ring-offset-base-100 ring-offset-2">
            <img src={image} alt={name} />
          </div>
        </div>
          
        <div>
          <h4 className="text-lg font-semibold">{name}</h4>
          
      {/* Review Message */}
      <p className="text-gray-600 leading-relaxed mb-6">
        {role}
      </p>
          <p className="text-sm text-gray-500">{designation}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
