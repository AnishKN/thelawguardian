import React, { useState } from "react";
import axios from "axios";
import notfound from './no-data.png';
import Swal from 'sweetalert2'

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedData, setUploadedData] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      // alert("Please select a file first.");
      Swal.fire(
        'Error',
        'Please select a file first.',
        'error'
      )
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    const metadata = {
      name: "File name",
    };
    formData.append("pinataMetadata", JSON.stringify(metadata));

    const options = {
      cidVersion: 0,
    };
    formData.append("pinataOptions", JSON.stringify(options));

    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiOWU2NDM3ZC0xYjdkLTRmMGItYjQyMy0zMzM4NzhjZjlkOGQiLCJlbWFpbCI6ImtyaXNobmFhbmlzaDIxQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIzN2NhYTg5Nzk4NDhkYjQ5YmNhZSIsInNjb3BlZEtleVNlY3JldCI6IjczZmZiNTc1ZDJjZDI1MTRlMjUxOWZlNDQ5YzkxOGE4MGU1OGVmYjU0MTlhY2U3YjFhY2FlZThmOTY4YzFiMjQiLCJleHAiOjE3ODkwMjc1MDR9.psKsvxrC1QoIDgn2bk3FC9EPf_86hyuTcSjVNU_CYGg`, // Replace with your JWT token
          },
        }
      );

      // Extract specific properties from response.data
      const { IpfsHash } = response.data;

      // Create a string to display in the list
      const displayText = `${IpfsHash}`;

      setUploadedData((prevData) => [...prevData, displayText]);
      setSelectedFile(null);
      Swal.fire(
        'Success',
        "File successfully uploaded",
        'success'
      )
    } catch (error) {
      console.error("Error uploading file:", error);
      Swal.fire(
        'Error uploading file:',
        error,
        'error'
      )
    }
  };

  return (
    <>
    <header id="header" class="header fixed-top" data-scrollto-offset="0">
    <div class="container-fluid d-flex align-items-center justify-content-between">

      <a href="index.html" class="logo d-flex align-items-center scrollto me-auto me-lg-0">
        {/* <!-- Uncomment the line below if you also wish to use an image logo --> */}
        <img className="logo" src="https://thelawguardian.vercel.app/assets/img/LawGuardianLogoFinal3.jpg" alt=""/>
        {/* <!-- <h1>TheLawGuardian<span>.</span></h1> --> */}
      </a>

      <nav id="navbar" className="navbar">
        {/* <ul>

          <li><a class="nav-link scrollto" href="#">Home</a></li>
          <li><a class="nav-link scrollto" href="index.html#services">Services</a></li>
          <li><a class="nav-link scrollto" href="index.html#portfolio">Portfolio</a></li>
          <li><a class="nav-link scrollto" href="index.html#team">Team</a></li>
          <li><a href="blog.html">Blog</a></li>
          
          <li><a class="nav-link scrollto" href="index.html#contact">Contact</a></li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle d-none"></i> */}
      </nav>

    
    </div>
  </header>
  <br/><br/><br/>
    <div className="cont container">
      <h1>Secure file upload</h1>
      <input className="form-control form-control-md gg" type="file" onChange={handleFileChange} />
      <button className="btn btn-md btn-success" onClick={handleFileUpload}>Upload File</button>
      <div>
        
        <div>
          { uploadedData.length === 0 ?
            <>
              <img src={notfound} alt="No files uploaded" width={250}/>
              <h3>No files uploaded!</h3>
            </>
          : <>
          <h3>Uploaded Files</h3>
          </>}
          {uploadedData.map((data, index) => (
            <>
            <div class="card" styles="width: 100%;">
              <div class="card-body">
                <h5 class="card-title"><strong>{index+1}. {data}</strong></h5>
                <p class="card-text"></p>
                <a href={`https://gateway.pinata.cloud/ipfs/${data}`} class="btn btn-success" target="_">View</a>
              </div>
            
          </div>
          <br/>
          </>
            
          ))}
        </div>

      </div>
    </div>
    </>
  );
};

export default FileUpload;
