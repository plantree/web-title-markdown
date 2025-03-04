'use client';

import { useState } from 'react';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [url, setUrl] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCopied(false);
    setLoading(true);
    setError('');
    setMarkdown('');
    setTitle('');

    try {
      const response = await fetch('/.netlify/functions/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch title');
      }

      const data = await response.json();
      setMarkdown(data.markdown);
      setTitle(data.title);
    } catch (err) {
      setError('Error fetching webpage title. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Web Title to Markdown</h1>
          <p className="text-gray-600">Enter a URL to generate a markdown citation with its title</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Converting...' : 'Convert'}
            </button>
          </div>
        </form>

        {error && (
          <div className="p-4 text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {markdown && (
          <div className="space-y-4 p-6 bg-white rounded-lg shadow">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-900">Title</h2>
              <p className="text-gray-700">{title}</p>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-900">Markdown</h2>
              <div className="p-3 bg-gray-100 rounded font-mono text-sm overflow-x-auto whitespace-pre-wrap break-words">
                {markdown}
              </div>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 focus:outline-none"
              >
                {copied ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <ClipboardIcon className="h-4 w-4" />
                )}
                {copied ? 'Copied!' : 'Copy to clipboard'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
