const GoogleMapSection = () => {
  return (
    <div style={{ width: "100%", height: "400px", marginTop: "40px" }}>
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19622.63773976339!2d-95.5468008034127!3d29.60877157273087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640e91234bd5d77%3A0xdfb5aabc6b72d79e!2sS&#39;M-ORR%20Sweets%20%26%20Cafe!5e0!3m2!1sen!2sus!4v1755442294670!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>
  );
};

export default GoogleMapSection;