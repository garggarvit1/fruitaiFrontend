// import React from "react";
// import './Faq.css'; // Optional if you prefer an external CSS file

// const Faq = () => {
//   const faqData = [
//     {
//       title: "How is Tangerine healthy?",
//       content:
//         "Tangerine are a great health booster due to their high vitamin C content, which supports the immune system and skin health.",
//       imageUrl:
//         "https://images.unsplash.com/photo-1502974995397-f3245793896e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
//     },
//     // Add more items as needed
//   ];

//   return (
//     <div className="container">
//       <div className="faq-section">FaQ Section</div>
//       {faqData.map((faq, index) => (
//         <div key={index} className="faq-item">
//           <img src={faq.imageUrl} alt="Tangerine" className="faq-image" />
//           <h3 className="faq-title">{faq.title}</h3>
//           <p className="faq-content">{faq.content}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Faq;


import React, { useState, useEffect } from "react";
import axios from "axios";
import './Faq.css';

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [newFaq, setNewFaq] = useState({ title: "", content: "", imageUrl: "" });
  const [editingFaq, setEditingFaq] = useState(null); // For updating FAQs

  // Fetch FAQs from backend
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/faqs/get");
        setFaqs(response.data);
      } catch (error) {
        console.error("Error fetching FAQs", error);
      }
    };

    fetchFaqs();
  }, []);

  // Add a new FAQ
  const handleAddFaq = async () => {
    if (!newFaq.title || !newFaq.content) {
      alert("Please fill out both the question and the answer.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/faqs/add", newFaq);
      setFaqs([...faqs, response.data]);
      setNewFaq({ title: "", content: "", imageUrl: "" });
    } catch (error) {
      console.error("Error adding FAQ", error);
    }
  };

  // Delete an FAQ
  const handleDeleteFaq = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/faqs/delete/${id}`);
      setFaqs(faqs.filter((faq) => faq._id !== id));
    } catch (error) {
      console.error("Error deleting FAQ", error);
    }
  };

  // Update an FAQ
  const handleUpdateFaq = async (id) => {
    if (!editingFaq || !editingFaq.title || !editingFaq.content) {
      alert("Please fill out both the question and the answer.");
      return;
    }
    try {
      const response = await axios.put(`http://localhost:5000/api/faqs/${id}`, editingFaq);
      setFaqs(faqs.map((faq) => (faq._id === id ? response.data : faq)));
      setEditingFaq(null); // Reset editing state
    } catch (error) {
      console.error("Error updating FAQ", error);
    }
  };

  return (
    <div className="bodyfaq">
    <div className="containerfaq">
      <h1>FAQ Section</h1>
      <div className="faqcontain">

       {/* Display existing FAQs */}
        {faqs.map((faq) => (
          <div key={faq._id} className="faq-item">
            <img src={faq.imageUrl} alt="FAQ" className="faq-image" />
            <h3 className="faq-title">{faq.title}</h3>
            <p className="faq-content">{faq.content}</p>

            {/* Buttons for update and delete */}
            <button className="key" onClick={() => setEditingFaq(faq)}>Edit</button>
            <button className="key" onClick={() => handleDeleteFaq(faq._id)}>Delete</button>

            {/* If an FAQ is selected for editing, show input fields */}
            {editingFaq && editingFaq._id === faq._id && (
              <div className="edit-faq">
                <input
                  type="text"
                  value={editingFaq.title}
                  onChange={(e) => setEditingFaq({ ...editingFaq, title: e.target.value })}
                  placeholder="Update question"
                />
                <input
                  type="text"
                  value={editingFaq.content}
                  onChange={(e) => setEditingFaq({ ...editingFaq, content: e.target.value })}
                  placeholder="Update answer"
                />
                <button className="key" onClick={() => handleUpdateFaq(faq._id)}>Update FAQ</button>
              </div>
            )}
          </div>
        ))}

      </div> 

      {/* Add new FAQ card */}
      <div className="add-faq">
        <div className="addyfaq">
        <h3>Add New FAQ</h3>
        <input
          type="text"
          className="inputadd"
          placeholder="Enter FAQ question"
          value={newFaq.title}
          onChange={(e) => setNewFaq({ ...newFaq, title: e.target.value })}
        />
        <input
          className="inputadd"
          type="text"
          placeholder="Enter FAQ answer"
          value={newFaq.content}
          onChange={(e) => setNewFaq({ ...newFaq, content: e.target.value })}
        />
        <input
          className="inputadd"
          type="text"
          placeholder="Enter image URL (optional)"
          value={newFaq.imageUrl}
          onChange={(e) => setNewFaq({ ...newFaq, imageUrl: e.target.value })}
        />
        <button className="keyadd" onClick={handleAddFaq}>Add FAQ</button>
      </div>
      </div>
    </div>
    </div>
  );
};

export default Faq;
