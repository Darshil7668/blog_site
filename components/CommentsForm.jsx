import { gql, GraphQLClient } from 'graphql-request';
import { comment } from 'postcss';
import React, { useEffect, useState } from 'react'
const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({ name: undefined, email: undefined, comment: undefined, storeData: false });
  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initalFormData = {
      name: window.localStorage.getItem('name'),
      email: window.localStorage.getItem('email'),
      storeData: window.localStorage.getItem('name') || window.localStorage.getItem('email'),
    };
    if (initalFormData.name === null || initalFormData.email === null || initalFormData.comment === null) {
      initalFormData.name === window.localStorage.setItem("name", '')
      initalFormData.email === window.localStorage.setItem("email", '')
      initalFormData.comment === window.localStorage.setItem("comment", '')
    }

    setFormData(initalFormData);
  }, []);

  const onInputChange = (e) => {
    const { target } = e;
    if (target.type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const handlePostSubmission = () => {
    setError(false);
    const { name, email, comment, storeData } = formData;
    if (!name || !email || !comment) {
      setError(true);
      return;
    }
    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    }


    const postData = async (commentObj) => {
      const TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2ODE4ODU0NzMsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NsZ2trb2wxcTM4NG4wMXQ1ODZnaThpNDcvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6IjhhZGVkZjM4LTYzNDktNGFmZC04ODhiLWE3MmQyZDk1MmVkMiIsImp0aSI6ImNsZ25iNnA2azVtbDIwMXQ1MDY3YWVyYzUifQ.Q2Y10AhL5TzCdoT2oLO78TcsIVvGTkc6SsPbQi5Lu4on1mft59jvO-orzOJcEsbdDNFpdvQ_ZuMJVgV3-Axyew1X_2Qe9kz8mSr5uuLwIPX-nfw-Qlg8CBhNFnYb1a0fjlmkh8sIVBZK4zoDY7BvPK6zjp0G1Z42mphxz8Ph2WkyP8YCviyrKJAy5NecPV0kmAP44tSj93gKGFduRg9CvEJeLKW-qwMNW8pDZ3iSZs6UIjBncI8ipS2kmNAk4_wDx6Jp5ifI25ujW_7cqqjKj5XkYq-p-NXXGyGEpbUxQOBXHxoJoGPFgJ3KAziFpJGl33_4uwOg3yPagWR4hrjRsWs1ccD_0MPqAQ5XhskwWsaxzrSAPPXYV-C5VotbVunQFqcqkEHEznP3rnRTLo-Nv4Y7RRhMzfW3TKUbBGGuWtjLmAaCq620k_Mxy0Z4FaY11LlULjmFzjC40vRJZAyCV1jWphW3kcu4GB5mNypn3Dom1Cs-1OYoxixBb5d00rcnoJOGwwYgBKpv5hP550x2TTp9FUcotoIoYE83JLxgN5TLzukP9VscfXfMOAEZz45A0KA0wJ65lC1hkMRlTlK7rCyJyKuk2awyiQYbZRi-K4SWVJBxPESaLXT1wfbAFzEfSKSoxcEwvv_qORdlSF59B7RcydIlZ83CFpETivU45BI'
      const endpoint = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
      const headers = {
        authorization: `Bearer ${TOKEN}`,
      };
      const graphQLClient = new GraphQLClient(endpoint, { headers });
      const mutation = gql`
      mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
        createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
      }
    `;
      try {
        const variables = {
          name: commentObj.name,
          email: commentObj.email,
          comment: commentObj.comment,
          slug: commentObj.slug,
        };
        const result = await graphQLClient.request(mutation, variables);
        return result
      } catch (error) {
        console.error(error);
      }
    }
    postData(commentObj)
      .then((res) => {
        if (res.createComment) {
          if (!storeData) {
            formData.name = '';
            formData.email = '';
          }
          formData.comment = '';
          setFormData((prevState) => ({
            ...prevState,
            ...formData,
          }));
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000);
        }
      });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave a Reply</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea value={formData.comment} onChange={onInputChange} className="p-4 outline-none w-full rounded-lg max-h-42  focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" name="comment" placeholder="Comment" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input type="text" value={formData.name} onChange={onInputChange} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" placeholder="Name" name="name" />
        <input type="email" value={formData.email} onChange={onInputChange} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" placeholder="Email" name="email" />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input checked={formData.storeData} onChange={onInputChange} type="checkbox" id="storeData" name="storeData" />
          <label className="text-gray-500 cursor-pointer" htmlFor="storeData"> Save my name, email in this browser for the next time I comment.</label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All fields are mandatory</p>}
      <div className="mt-8">
        <button type="button" onClick={handlePostSubmission} className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">Post Comment</button>
        {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment submitted for review</span>}
      </div>
    </div>
  )
}

export default CommentsForm