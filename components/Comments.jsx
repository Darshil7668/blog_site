import React, { useEffect, useState } from 'react'
import moment from 'moment';
import parse from 'html-react-parser';
import { getComments } from './Fetch';

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getComments(slug).then((result) => {
      setComments(result);
    });
  }, [slug]);
  return (
    <>
      {comments.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 dark:bg-black dark:bg-opacity-60">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4 dark:text-white">
            {comments.length}
            {' '}
            Comments
          </h3>
          {comments.map((comment, index) => (
            <div key={index} className="border-b border-gray-100 mb-4 pb-4 dark:text-white">
              <p className="mb-4">
                <span className="font-semibold dark:text-white">{comment.name}</span>
                {' '}
                on
                {' '}
                {moment(comment.createdAt).format('MMM DD, YYYY')}
              </p>
              <p className="whitespace-pre-line text-gray-600 w-full dark:text-gray-400">{parse(comment.comment)}</p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Comments