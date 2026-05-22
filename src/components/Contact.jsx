import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact({ profile }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid Email Address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message content cannot be blank';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate server side submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      {/* Background spotlight */}
      <div className="absolute bottom-[10%] left-[20%] w-[350px] h-[350px] rounded-full bg-cyber-emerald/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-cyber-emerald font-sans">
            Contact
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold font-sans text-slate-100">
            Let's Collaborate
          </h3>
          <div className="w-12 h-1 bg-cyber-emerald rounded-full mx-auto" />
          <p className="text-slate-400 font-sans text-sm font-light leading-relaxed">
            Have an exciting opportunity, project proposal, or just want to chat? Reach out via the form or my social outlets!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Contact Details Grid */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="glass-panel p-8 rounded-2xl border border-slate-800/80 bg-cyber-slate-900/30 flex-1 flex flex-col justify-center space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full pointer-events-none" />

              <h4 className="font-sans font-bold text-lg text-slate-200 mb-2">
                Connect Directly
              </h4>

              {/* Direct channels */}
              <div className="space-y-5">
                {profile.email && (
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-cyber-emerald">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="block text-2xs uppercase text-slate-500 font-bold tracking-wider">Email Address</span>
                      <a href={`mailto:${profile.email}`} className="text-sm text-slate-300 hover:text-cyber-emerald font-sans transition-colors">
                        {profile.email}
                      </a>
                    </div>
                  </div>
                )}

                {profile.phone && (
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-cyber-teal">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="block text-2xs uppercase text-slate-500 font-bold tracking-wider">Phone Line</span>
                      <span className="text-sm text-slate-300 font-sans">
                        {profile.phone}
                      </span>
                    </div>
                  </div>
                )}

                {profile.location && (
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-cyber-violet">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="block text-2xs uppercase text-slate-500 font-bold tracking-wider">Location Hub</span>
                      <span className="text-sm text-slate-300 font-sans">
                        {profile.location}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 rounded-2xl border border-slate-800 bg-cyber-slate-900/40 relative min-h-[420px] flex flex-col justify-center">
              
              {isSuccess ? (
                /* Success Animated State */
                <div className="text-center space-y-4 py-8 animate-float-medium">
                  <div className="w-16 h-16 bg-cyber-emerald/10 border border-cyber-emerald/20 text-cyber-emerald rounded-full flex items-center justify-center mx-auto shadow-glow-emerald">
                    <CheckCircle size={36} />
                  </div>
                  <h4 className="font-sans font-extrabold text-xl text-slate-100">Message Received!</h4>
                  <p className="text-slate-400 font-sans text-xs max-w-sm mx-auto font-light leading-relaxed">
                    Thank you for reaching out. I have received your request and will get back to you within 24 business hours.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="px-4.5 py-2 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-slate-100 hover:bg-slate-800 transition-all duration-300"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* Main Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h4 className="font-sans font-bold text-lg text-slate-200 mb-2">
                    Send a Message
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-2xs uppercase text-slate-500 font-bold tracking-wider mb-1.5">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-cyber-slate-950/80 border ${errors.name ? 'border-red-500/50' : 'border-slate-800'} focus:border-cyber-emerald focus:ring-1 focus:ring-cyber-emerald/20 outline-none rounded-xl px-4 py-3 text-slate-255 transition-all text-xs`}
                        placeholder="Alex Mercer"
                      />
                      {errors.name && (
                        <span className="flex items-center space-x-1 mt-1 text-2xs text-red-400">
                          <AlertCircle size={10} />
                          <span>{errors.name}</span>
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-2xs uppercase text-slate-500 font-bold tracking-wider mb-1.5">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-cyber-slate-950/80 border ${errors.email ? 'border-red-500/50' : 'border-slate-800'} focus:border-cyber-emerald focus:ring-1 focus:ring-cyber-emerald/20 outline-none rounded-xl px-4 py-3 text-slate-255 transition-all text-xs`}
                        placeholder="alex@example.com"
                      />
                      {errors.email && (
                        <span className="flex items-center space-x-1 mt-1 text-2xs text-red-400">
                          <AlertCircle size={10} />
                          <span>{errors.email}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-2xs uppercase text-slate-500 font-bold tracking-wider mb-1.5">Your Message</label>
                    <textarea 
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full bg-cyber-slate-950/80 border ${errors.message ? 'border-red-500/50' : 'border-slate-800'} focus:border-cyber-emerald focus:ring-1 focus:ring-cyber-emerald/20 outline-none rounded-xl px-4 py-3 text-slate-255 transition-all text-xs font-sans resize-y leading-relaxed`}
                      placeholder="Hi Alexander, I would love to build..."
                    />
                    {errors.message && (
                      <span className="flex items-center space-x-1 mt-1 text-2xs text-red-400">
                        <AlertCircle size={10} />
                        <span>{errors.message}</span>
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyber-emerald to-cyber-teal hover:shadow-glow-emerald hover:brightness-110 text-slate-950 font-bold text-sm tracking-wide transition-all disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Transmitting Message...' : 'Transmit Message'}</span>
                    <Send size={14} className={isSubmitting ? 'animate-pulse' : ''} />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
