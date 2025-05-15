import { useState, useEffect } from "react";
import axios from "axios";

const DoctorCard = ({ item }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `http://localhost:8080/api/doctor/${item.doctorImage}`;
    axios
      .get(url, { responseType: "blob" })
      .then((res) => {
        const blobUrl = URL.createObjectURL(res.data);
        setImgSrc(blobUrl);
      })
      .catch((err) => {
        console.error("Error fetching doctor image:", err);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      if (imgSrc) URL.revokeObjectURL(imgSrc);
    };
  }, [item.doctorImage]);

  return (
    <div className="col">
      <div className="card border-color rounded-card card-hover product-card custom-bg h-100">
        {loading ? (
          <div className="img-spinner">
            <div className="spinner" />
          </div>
        ) : imgSrc ? (
          <img
            src={imgSrc}
            className="card-img-top rounded mx-auto d-block m-2"
            alt={`${item.firstName} ${item.lastName}`}
            style={{ maxHeight: "270px", width: "auto" }}
          />
        ) : (
          <div className="img-spinner">
            <span>No image</span>
          </div>
        )}

        <div className="card-body text-color">
          <h5 className="card-title">
            <b>
              {item.firstName} {item.lastName}
            </b>
          </h5>
          <p className="text-color">
            <b>
              <i>Specialist:</i> {item.specialist}
            </b>
          </p>
          <p className="text-color">
            <b>
              <i>Experience:</i> {item.experience}
            </b>
          </p>
          <p className="text-color">
            <b>
              <i>Age:</i> {item.age}
            </b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
