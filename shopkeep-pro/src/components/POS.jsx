import React from 'react';
import { ShoppingCart, Plus, Trash2, QrCode, Printer } from 'lucide-react';

const POS = ({
    filteredInventory,
    addToCart,
    cart,
    setCart,
    paymentMethod,
    setPaymentMethod,
    customerName,
    setCustomerName,
    completeSale
}) => {
    const total = cart.reduce((a, b) => a + (b.price * b.quantity), 0);

    return (
        <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in duration-500">
            <div className="flex-1 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredInventory.filter(i => i.stock > 0).map(item => (
                        <button key={item._id} onClick={() => addToCart(item)} className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm text-left hover:border-indigo-500 hover:shadow-xl transition-all active:scale-[0.98] group relative">
                            <p className="font-black text-slate-800 group-hover:text-indigo-600 transition-colors">{item.name}</p>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-indigo-600 font-black text-lg">₹{item.price}</span>
                                <div className="bg-indigo-50 text-indigo-600 p-1.5 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-all"><Plus size={18} strokeWidth={3} /></div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="w-full lg:w-[400px] flex flex-col gap-6 shrink-0">
                <div className="bg-white rounded-[40px] p-8 shadow-2xl border border-slate-100 h-[520px] flex flex-col">
                    <h4 className="font-black text-xl text-slate-800 mb-6 flex items-center gap-2"><ShoppingCart size={24} className="text-indigo-600" /> New Bill</h4>
                    <div className="flex-1 overflow-y-auto space-y-3">
                        {cart.map(i => (
                            <div key={i._id} className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center group border border-transparent hover:border-slate-200 transition-all">
                                <div className="flex-1 pr-4">
                                    <p className="font-black text-sm text-slate-800">{i.name}</p>
                                    <p className="text-[10px] text-slate-400 font-bold">{i.quantity} x ₹{i.price}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-black text-slate-700">₹{i.price * i.quantity}</span>
                                    <button onClick={() => setCart(c => c.filter(x => x._id !== i._id))} className="text-slate-300 hover:text-rose-500"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 mt-4 border-t-2 border-dashed border-slate-100 space-y-4">
                        {paymentMethod === 'UPI/Online' && cart.length > 0 && (
                            <div className="p-4 bg-indigo-50 rounded-2xl flex items-center gap-4 animate-in">
                                <div className="bg-white p-2 rounded-lg"><QrCode size={40} className="text-indigo-600" /></div>
                                <p className="text-xs font-bold text-indigo-600">Scan to Pay UPI</p>
                            </div>
                        )}
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bill Total</p>
                                <p className="font-black text-3xl text-indigo-600">₹{total.toLocaleString('en-IN')}</p>
                            </div>
                            <button onClick={() => window.print()} className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-indigo-600"><Printer size={20} /></button>
                        </div>
                    </div>
                </div>

                <div className="bg-indigo-600 rounded-[40px] p-8 text-white space-y-6 shadow-xl">
                    <div className="space-y-4">
                        <input value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Customer Name" className="w-full bg-white/10 border-none rounded-xl py-3 px-4 text-sm text-white placeholder:text-white/30" />
                        <div className="grid grid-cols-2 gap-2">
                            {['Cash', 'UPI/Online', 'Credit (Udhaar)', 'Card'].map(m => (
                                <button key={m} onClick={() => setPaymentMethod(m)} className={`py-2 rounded-xl text-[10px] font-black transition-all ${paymentMethod === m ? 'bg-white text-indigo-600' : 'bg-white/10 text-white/70'}`}>{m}</button>
                            ))}
                        </div>
                    </div>
                    <button onClick={completeSale} disabled={cart.length === 0} className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-black uppercase text-xs">Process Transaction</button>
                </div>
            </div>
        </div>
    );
};

export default POS;