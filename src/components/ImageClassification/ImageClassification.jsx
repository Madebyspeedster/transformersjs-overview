import { useState } from "react";
import { Button, Card, Alert, Spinner } from "react-bootstrap";
import { pipeline } from "@huggingface/transformers";
import { useDropzone } from "react-dropzone";

const ImageClassification = () => {
  const [image, setImage] = useState(null);
  const [classification, setClassification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: handleDrop,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image) {
      setError("Please upload an image for classification.");
      return;
    }

    setLoading(true);
    setClassification(null);
    setError("");

    try {
      const imageClassification = await pipeline("image-classification");

      const result = await imageClassification(image);

      setClassification(result[0]);
    } catch {
      setError("An error occurred while processing the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Image Classification</Card.Title>

          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag & drop an image here, or click to select one.</p>
          </div>

          {image && (
            <div className="mt-3">
              <img
                src={image}
                alt="Uploaded"
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "contain",
                }}
              />
            </div>
          )}

          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit}
            disabled={loading || !image}
            className="mt-3"
          >
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Classify Image"
            )}
          </Button>
        </Card.Body>
      </Card>

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      {classification && (
        <div className="mt-3">
          <h4>Classification Result:</h4>
          <p>
            <strong>Label:</strong> {classification.label}
          </p>
          <p>
            <strong>Confidence:</strong> {classification.score.toFixed(4)}
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageClassification;
