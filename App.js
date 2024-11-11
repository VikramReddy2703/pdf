import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "./App.css";

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

const PDF_FILE_URL = "https://morth.nic.in/sites/default/files/dd12-13_0.pdf";

function App() {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPage = (page) => {
    if (page > 0 && page <= numPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  return (
    <div className="App">
      <h1>PDF Viewer</h1>
      <Document file={PDF_FILE_URL} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={currentPage} />
      </Document>
      <p>Page {currentPage} of {numPages}</p>
      <div>
        <button onClick={prevPage} disabled={currentPage <= 1}>Previous</button>
        <button onClick={nextPage} disabled={currentPage >= numPages}>Next</button>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
          />
          Admin Mode (No Sync in This Version)
        </label>
      </div>
    </div>
  );
}

export default App;
