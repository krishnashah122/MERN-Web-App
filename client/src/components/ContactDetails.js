import React from "react";

const ContactDetails = (props) => {
  return (
    <div className="contact-info-item">
      <i className={`zmdi zmdi-${props.icon} material-icons-name`}></i>
      <div className="contact-info-content">
        <div className="contact-info-title">
            {props.item}
        </div>
        <div className="contact-info-text">
            {props.itemDetail}
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
