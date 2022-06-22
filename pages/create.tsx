import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';
import { NextPage } from 'next';

const Draft: NextPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/drafts');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Title'
            value={title}
            type='text'
            autoFocus
          />
          <textarea
            cols={50}
            rows={8}
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder='Content'
          />
          <input type='submit' disabled={!content || !title} value='create' />
          <a href='#' onClick={() => Router.push('/')} className='back'>
            or cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
