import React, { useState } from 'react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Handler for input field changes
  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);

    formData.append('access_key', '6d7bc3fc-6190-43c5-8298-89ac5ef7494f');

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: json,
    }).then(res => res.json());

    if (res.success) {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else {
      // Başarısızsa hemen loading'i kapatabilirsin
      setLoading(false);
    }
  };
  return (
    <form id="contact-form" onSubmit={onSubmit}>
      <div className="row gx-3 gy-4">
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">İsminiz</label>
            <input
              name="name"
              placeholder="İSİM *"
              className="form-control"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              name="email"
              placeholder="EMAİL *"
              className="form-control"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label className="form-label">Konu</label>
            <input
              name="subject"
              placeholder="KONU *"
              className="form-control"
              type="text"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label className="form-label">Mesajınız</label>
            <textarea
              name="message"
              placeholder="MESAJINIZ *"
              rows={4}
              className="form-control"
              value={formData.message}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="Gönder">
            <button
              className={`px-btn w-100 ${loading ? 'disabled' : ''}`}
              type="submit"
            >
              {loading ? 'Gönderiyor...' : 'Mesaj Gönder  '}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
