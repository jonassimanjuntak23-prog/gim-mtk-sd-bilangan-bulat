import React, { useState, useEffect } from 'react';
import { LevelInfo } from '../types/game';
import { soundFX } from '../utils/soundEffects';
import { speechNarration } from '../utils/speechNarration';
import {
  Thermometer,
  Snowflake,
  Sun,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Plus,
  Minus,
  Calculator,
  GitFork,
  Lightbulb,
  Box,
  RotateCw,
  PieChart,
  CheckCircle,
} from 'lucide-react';

interface Stage1ConceptProps {
  level: LevelInfo;
  onProceedToStage2: () => void;
}

export const Stage1_Concept: React.FC<Stage1ConceptProps> = ({
  level,
  onProceedToStage2,
}) => {
  // TTS intro for stage 1
  useEffect(() => {
    const text = `Selamat datang di Tahap Satu: Memahami dan Menganalisis ${level.title}. Mari kita eksplorasi konsep secara interaktif sebelum memulai tantangan!`;
    speechNarration.speak(text);
  }, [level.id]);

  // Level 1 Simulator State: Temperature & Number Line
  const [tempVal, setTempVal] = useState<number>(-3);
  const [calcStart, setCalcStart] = useState<number>(-2);
  const [calcAdd, setCalcAdd] = useState<number>(5);

  // Level 2 Simulator State: Supermarket Cashier
  const [cart, setCart] = useState<{ milk: number; bread: number; apple: number }>({
    milk: 3,
    bread: 2,
    apple: 1,
  });
  const [moneyPaid, setMoneyPaid] = useState<number>(50000);

  // Level 3 Simulator State: Factor Tree & Blinking Lights
  const [selectedNum, setSelectedNum] = useState<number>(24);
  const [lightTimer, setLightTimer] = useState<number>(0);
  const [isLightRunning, setIsLightRunning] = useState<boolean>(true);

  // Level 4 Simulator State: 3D Cube
  const [cubeSide, setCubeSide] = useState<number>(4);

  // Level 5 Simulator State: Pizza Slices
  const [pizzaDenom, setPizzaDenom] = useState<number>(8);
  const [selectedSlices, setSelectedSlices] = useState<number[]>([0, 1, 2]);

  // Timer loop for synchronized blinking lights in Level 3
  useEffect(() => {
    if (level.id !== 3 || !isLightRunning) return;
    const interval = setInterval(() => {
      setLightTimer((t) => (t + 1) % 49);
    }, 1000);
    return () => clearInterval(interval);
  }, [level.id, isLightRunning]);

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 select-none">
      {/* Top Banner: Stage Badge & Competencies */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-3 shadow-md border-2 border-red-200">
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 bg-red-600 text-white font-black text-sm tracking-wide rounded-xl shadow uppercase flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            TAHAP 1: MEMAHAMI & MENGANALISIS
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              {level.themeTitle}
            </h2>
            <p className="text-xs font-semibold text-slate-500">
              {level.description}
            </p>
          </div>
        </div>

        {/* Big Action to Stage 2 */}
        <button
          onClick={() => {
            soundFX.playClick();
            onProceedToStage2();
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-base rounded-2xl shadow-lg border-2 border-yellow-300 active:scale-95 transition-all"
        >
          <span>LANJUT KE TAHAP 2: TANTANGAN SOAL</span>
          <ArrowRight className="w-6 h-6 text-yellow-300 animate-pulse" />
        </button>
      </div>

      {/* Main Interactive Workstation (Fixed Aspect Fit) */}
      <div className="flex-1 my-3 bg-white rounded-3xl p-5 shadow-lg border-2 border-slate-200 flex flex-col justify-between overflow-hidden">
        {/* ========================================================
            LEVEL 1 INTERACTIVE: THERMOMETER & NUMBER LINE
            ======================================================== */}
        {level.id === 1 && (
          <div className="h-full flex flex-col justify-between">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-bold text-slate-700 text-sm flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-red-600" />
                Eksplorasi Suhu Pegunungan & Garis Bilangan Negatif
              </span>
              <span className="text-xs font-medium text-slate-500">
                Geser pengatur suhu atau ubah operasi hitung untuk melihat posisi lompatan pada garis bilangan!
              </span>
            </div>

            <div className="grid grid-cols-12 gap-6 my-auto items-center">
              {/* Thermometer Visualizer */}
              <div className="col-span-4 bg-gradient-to-br from-sky-50 to-indigo-50 p-4 rounded-2xl border-2 border-sky-200 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2 font-black text-lg">
                  {tempVal < 0 ? (
                    <Snowflake className="w-6 h-6 text-blue-500 animate-spin" />
                  ) : (
                    <Sun className="w-6 h-6 text-amber-500 animate-pulse" />
                  )}
                  <span className={tempVal < 0 ? 'text-blue-600' : 'text-amber-600'}>
                    Suhu Udara: {tempVal}°C
                  </span>
                </div>

                {/* Thermometer Tube */}
                <div className="w-14 h-48 bg-slate-200 rounded-full p-1.5 relative border-2 border-slate-400 flex flex-col justify-end overflow-hidden shadow-inner">
                  {/* Mercury Fluid */}
                  <div
                    className={`w-full rounded-full transition-all duration-300 ${
                      tempVal < 0 ? 'bg-gradient-to-t from-blue-600 to-cyan-400' : 'bg-gradient-to-t from-red-600 to-amber-400'
                    }`}
                    style={{
                      height: `${Math.max(10, Math.min(100, ((tempVal + 15) / 40) * 100))}%`,
                    }}
                  />
                  {/* Freezing mark 0°C */}
                  <div className="absolute top-[62.5%] left-0 right-0 border-b-2 border-dashed border-red-500" />
                  <span className="absolute top-[60%] right-1 text-[9px] font-black text-red-600">
                    0°C
                  </span>
                </div>

                {/* Slider */}
                <div className="w-full mt-3">
                  <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                    <span>Beku (-15°C)</span>
                    <span>Nol (0°C)</span>
                    <span>Hangat (+25°C)</span>
                  </div>
                  <input
                    type="range"
                    min="-15"
                    max="25"
                    value={tempVal}
                    onChange={(e) => {
                      soundFX.playClick();
                      setTempVal(parseInt(e.target.value));
                    }}
                    className="w-full accent-red-600 cursor-pointer h-3"
                  />
                </div>
              </div>

              {/* Number Line Visualizer */}
              <div className="col-span-8 flex flex-col justify-between bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 h-full">
                <span className="text-sm font-extrabold text-slate-700">
                  Simulasi Operasi Hitung: ({calcStart}) + ({calcAdd}) = {calcStart + calcAdd}
                </span>

                {/* Animated Horizontal Number Line */}
                <div className="relative py-6 my-2">
                  {/* Zero line reference */}
                  <div className="h-2 bg-slate-300 w-full rounded-full relative">
                    {/* Points -10 to +10 */}
                    {Array.from({ length: 21 }, (_, i) => i - 10).map((num) => {
                      const isZero = num === 0;
                      const isCurrent = num === calcStart + calcAdd;
                      const isStart = num === calcStart;
                      return (
                        <div
                          key={num}
                          className="absolute -top-2 flex flex-col items-center"
                          style={{ left: `${((num + 10) / 20) * 96 + 2}%` }}
                        >
                          <div
                            className={`w-1 h-6 ${
                              isZero ? 'bg-red-600 w-1.5' : 'bg-slate-400'
                            }`}
                          />
                          <span
                            className={`text-[10px] mt-1 font-bold ${
                              isCurrent
                                ? 'text-red-600 scale-125 font-black'
                                : isZero
                                ? 'text-red-500 font-extrabold'
                                : 'text-slate-500'
                            }`}
                          >
                            {num}
                          </span>
                          {isCurrent && (
                            <div className="absolute -top-7 animate-bounce bg-red-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow">
                              Posisi: {num}
                            </div>
                          )}
                          {isStart && !isCurrent && (
                            <div className="absolute -bottom-6 bg-blue-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow">
                              Awal: {num}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Controls */}
                <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-600">Titik Awal:</span>
                    {[-5, -3, -1, 2, 4].map((v) => (
                      <button
                        key={v}
                        onClick={() => {
                          soundFX.playClick();
                          setCalcStart(v);
                        }}
                        className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all active:scale-95 ${
                          calcStart === v
                            ? 'bg-blue-600 text-white shadow'
                            : 'bg-white border text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-600">Lompatan:</span>
                    {[-4, -2, 3, 5, 7].map((v) => (
                      <button
                        key={v}
                        onClick={() => {
                          soundFX.playClick();
                          setCalcAdd(v);
                        }}
                        className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all active:scale-95 ${
                          calcAdd === v
                            ? 'bg-red-600 text-white shadow'
                            : 'bg-white border text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {v > 0 ? `+${v}` : v}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Teacher / Student Concept Insight */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900">
                💡 <strong>Kunci Konsep:</strong> Bilangan negatif bergerak ke arah kiri dari 0. Pengurangan dengan bilangan negatif sama dengan bergerak ke kanan (menjumlahkan): <code>a - (-b) = a + b</code>.
              </span>
            </div>
          </div>
        )}

        {/* ========================================================
            LEVEL 2 INTERACTIVE: CASHIER KABATAKU
            ======================================================== */}
        {level.id === 2 && (
          <div className="h-full flex flex-col justify-between">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-bold text-slate-700 text-sm flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-600" />
                Misi Kasir Belanja: Simulasi Aturan Operasi KABATAKU
              </span>
              <span className="text-xs font-medium text-slate-500">
                Ubah jumlah barang belanjaan di keranjang untuk melihat langkah perhitungan otomatis!
              </span>
            </div>

            <div className="grid grid-cols-12 gap-6 my-auto items-center">
              {/* Product Shelf / Cart Controls */}
              <div className="col-span-6 bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-200 space-y-3">
                <span className="text-xs font-black text-emerald-800 uppercase tracking-wide">
                  Daftar Belanjaan di Toko SD Kristen Teramia
                </span>

                {/* Item 1: Susu Kotak */}
                <div className="flex items-center justify-between bg-white p-2.5 rounded-xl shadow-sm border border-emerald-100">
                  <div>
                    <span className="font-extrabold text-sm text-slate-800">Susu Kotak Cerdas</span>
                    <p className="text-xs font-bold text-emerald-600">Rp8.000 / kotak</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        soundFX.playClick();
                        setCart((c) => ({ ...c, milk: Math.max(0, c.milk - 1) }));
                      }}
                      className="p-1.5 bg-slate-100 rounded-lg text-slate-700 hover:bg-slate-200 font-bold"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-black text-sm w-6 text-center">{cart.milk}</span>
                    <button
                      onClick={() => {
                        soundFX.playClick();
                        setCart((c) => ({ ...c, milk: c.milk + 1 }));
                      }}
                      className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-bold"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Item 2: Roti */}
                <div className="flex items-center justify-between bg-white p-2.5 rounded-xl shadow-sm border border-emerald-100">
                  <div>
                    <span className="font-extrabold text-sm text-slate-800">Roti Isi Cokelat</span>
                    <p className="text-xs font-bold text-emerald-600">Rp5.000 / bungkus</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        soundFX.playClick();
                        setCart((c) => ({ ...c, bread: Math.max(0, c.bread - 1) }));
                      }}
                      className="p-1.5 bg-slate-100 rounded-lg text-slate-700 hover:bg-slate-200 font-bold"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-black text-sm w-6 text-center">{cart.bread}</span>
                    <button
                      onClick={() => {
                        soundFX.playClick();
                        setCart((c) => ({ ...c, bread: c.bread + 1 }));
                      }}
                      className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-bold"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Item 3: Apel */}
                <div className="flex items-center justify-between bg-white p-2.5 rounded-xl shadow-sm border border-emerald-100">
                  <div>
                    <span className="font-extrabold text-sm text-slate-800">Apel Fuji Segar</span>
                    <p className="text-xs font-bold text-emerald-600">Rp4.000 / buah</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        soundFX.playClick();
                        setCart((c) => ({ ...c, apple: Math.max(0, c.apple - 1) }));
                      }}
                      className="p-1.5 bg-slate-100 rounded-lg text-slate-700 hover:bg-slate-200 font-bold"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-black text-sm w-6 text-center">{cart.apple}</span>
                    <button
                      onClick={() => {
                        soundFX.playClick();
                        setCart((c) => ({ ...c, apple: c.apple + 1 }));
                      }}
                      className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-bold"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Receipt & Step Calculation Display */}
              <div className="col-span-6 bg-slate-900 text-white p-4 rounded-2xl shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-2">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <Calculator className="w-4 h-4" /> STRUK KASIR & ATURAN HITUNG
                    </span>
                    <span className="text-[11px] text-slate-400">Metode: KABATAKU</span>
                  </div>

                  {/* Mathematical Expression */}
                  <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 font-mono text-sm leading-relaxed space-y-1.5">
                    <p className="text-yellow-300 font-bold">
                      Kalimat Matematika:
                    </p>
                    <p className="text-xs text-white">
                      ({cart.milk} × 8.000) + ({cart.bread} × 5.000) + ({cart.apple} × 4.000)
                    </p>
                    <p className="text-xs text-emerald-300">
                      = Rp{(cart.milk * 8000).toLocaleString('id-ID')} + Rp{(cart.bread * 5000).toLocaleString('id-ID')} + Rp{(cart.apple * 4000).toLocaleString('id-ID')}
                    </p>
                    <p className="text-sm font-black text-white pt-1 border-t border-slate-700">
                      Total Belanja = Rp{(cart.milk * 8000 + cart.bread * 5000 + cart.apple * 4000).toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>

                {/* Change calculation */}
                <div className="mt-3 pt-3 border-t border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400">Uang Tunai:</span>
                    <div className="flex gap-1.5 mt-1">
                      {[50000, 100000].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => {
                            soundFX.playClick();
                            setMoneyPaid(amt);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                            moneyPaid === amt
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          Rp{amt.toLocaleString('id-ID')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400">Uang Kembalian:</span>
                    <p className="text-lg font-black text-yellow-400">
                      Rp{Math.max(0, moneyPaid - (cart.milk * 8000 + cart.bread * 5000 + cart.apple * 4000)).toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5">
              <span className="text-xs font-bold text-amber-900">
                💡 <strong>Aturan Baku:</strong> Selesaikan operasi di dalam tanda kurung <code>(...)</code> lebih dulu, lalu perkalian & pembagian, kemudian penjumlahan & pengurangan!
              </span>
            </div>
          </div>
        )}

        {/* ========================================================
            LEVEL 3 INTERACTIVE: FACTOR TREE & BLINKING LIGHTS
            ======================================================== */}
        {level.id === 3 && (
          <div className="h-full flex flex-col justify-between">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-bold text-slate-700 text-sm flex items-center gap-2">
                <GitFork className="w-5 h-5 text-amber-600" />
                Detektif Bilangan: Pohon Faktor & Simulasi Lampu Berkedip (KPK)
              </span>
              <span className="text-xs font-medium text-slate-500">
                Amati bagaimana KPK menghubungkan waktu kedipan lampu secara periodik!
              </span>
            </div>

            <div className="grid grid-cols-12 gap-6 my-auto items-center">
              {/* Factor Tree Interactive Preview */}
              <div className="col-span-6 bg-amber-50 p-4 rounded-2xl border-2 border-amber-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-amber-900 uppercase">
                    Pohon Faktor Bilangan
                  </span>
                  <div className="flex gap-1.5">
                    {[24, 36, 48].map((n) => (
                      <button
                        key={n}
                        onClick={() => {
                          soundFX.playClick();
                          setSelectedNum(n);
                        }}
                        className={`px-3 py-1 rounded-xl text-xs font-extrabold ${
                          selectedNum === n ? 'bg-amber-600 text-white' : 'bg-white border text-amber-900'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Factor Tree Diagram */}
                <div className="bg-white rounded-xl p-4 border border-amber-200 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-amber-500 text-white font-black text-lg flex items-center justify-center shadow">
                    {selectedNum}
                  </div>
                  <div className="h-4 w-0.5 bg-amber-400 my-0.5" />
                  <div className="flex gap-12">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-emerald-500 text-white font-black text-sm flex items-center justify-center shadow">
                        2
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 mt-0.5">Prima</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-slate-300 text-slate-800 font-black text-sm flex items-center justify-center shadow">
                        {selectedNum / 2}
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500 mt-0.5">Komposit</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t w-full text-center">
                    <span className="text-xs font-extrabold text-slate-700">
                      Faktorisasi Prima: {selectedNum === 24 ? '2³ × 3' : selectedNum === 36 ? '2² × 3²' : '2⁴ × 3'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Blinking Lights Simulator */}
              <div className="col-span-6 bg-slate-900 text-white p-4 rounded-2xl border-2 border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-yellow-400 uppercase flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-yellow-400" />
                    Simulasi KPK: Lampu Berkedip
                  </span>
                  <span className="font-mono text-xs text-slate-400">Detik ke-{lightTimer}s</span>
                </div>

                <div className="grid grid-cols-2 gap-4 my-2">
                  {/* Lampu Merah (every 6s) */}
                  <div
                    className={`p-3 rounded-xl border flex flex-col items-center transition-all ${
                      lightTimer % 6 === 0
                        ? 'bg-red-600/30 border-red-500 shadow-lg shadow-red-500/50 scale-105'
                        : 'bg-slate-800 border-slate-700 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full mb-2 flex items-center justify-center ${
                        lightTimer % 6 === 0 ? 'bg-red-500 text-white shadow-lg' : 'bg-red-950 text-red-700'
                      }`}
                    >
                      💡
                    </div>
                    <span className="font-bold text-xs">Lampu Merah</span>
                    <span className="text-[10px] text-slate-400">Tiap 6 detik</span>
                  </div>

                  {/* Lampu Putih (every 8s) */}
                  <div
                    className={`p-3 rounded-xl border flex flex-col items-center transition-all ${
                      lightTimer % 8 === 0
                        ? 'bg-yellow-500/30 border-yellow-400 shadow-lg shadow-yellow-400/50 scale-105'
                        : 'bg-slate-800 border-slate-700 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full mb-2 flex items-center justify-center ${
                        lightTimer % 8 === 0 ? 'bg-yellow-300 text-slate-900 shadow-lg' : 'bg-yellow-950 text-yellow-700'
                      }`}
                    >
                      💡
                    </div>
                    <span className="font-bold text-xs">Lampu Putih</span>
                    <span className="text-[10px] text-slate-400">Tiap 8 detik</span>
                  </div>
                </div>

                {/* Coincidence Alert when KPK met (24s, 48s) */}
                <div
                  className={`mt-2 p-2 rounded-xl text-center text-xs font-black transition-all ${
                    lightTimer % 24 === 0 && lightTimer > 0
                      ? 'bg-emerald-500 text-white animate-bounce'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {lightTimer % 24 === 0 && lightTimer > 0
                    ? '🎉 BERKEDIP BERSAMAAN! (KPK dari 6 & 8 = 24 detik)'
                    : 'Menunggu pertemuan berikutnya di detik ke-24...'}
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5">
              <span className="text-xs font-bold text-amber-900">
                💡 <strong>KPK vs FPB:</strong> KPK digunakan untuk waktu yang berulang bersamaan. FPB digunakan untuk membagi benda menjadi kelompok sama banyak tanpa sisa!
              </span>
            </div>
          </div>
        )}

        {/* ========================================================
            LEVEL 4 INTERACTIVE: 3D CUBIC BUILDER
            ======================================================== */}
        {level.id === 4 && (
          <div className="h-full flex flex-col justify-between">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-bold text-slate-700 text-sm flex items-center gap-2">
                <Box className="w-5 h-5 text-purple-600" />
                Misteri Kubus Ajaib: Visualisasi Volume dan Rusuk Pangkat Tiga
              </span>
              <span className="text-xs font-medium text-slate-500">
                Ubah panjang rusuk kubus untuk melihat perubahan susunan kubus satuan!
              </span>
            </div>

            <div className="grid grid-cols-12 gap-6 my-auto items-center">
              {/* Interactive Isometric Cube Visualizer */}
              <div className="col-span-6 bg-purple-50 p-4 rounded-2xl border-2 border-purple-200 flex flex-col items-center">
                <div className="w-44 h-44 flex items-center justify-center relative">
                  {/* Isometric SVG Cube drawing */}
                  <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl animate-float">
                    {/* Top Face */}
                    <polygon
                      points="100,30 160,65 100,100 40,65"
                      fill="#a855f7"
                      stroke="#6b21a8"
                      strokeWidth="2"
                    />
                    {/* Left Face */}
                    <polygon
                      points="40,65 100,100 100,170 40,135"
                      fill="#7e22ce"
                      stroke="#581c87"
                      strokeWidth="2"
                    />
                    {/* Right Face */}
                    <polygon
                      points="160,65 100,100 100,170 160,135"
                      fill="#9333ea"
                      stroke="#6b21a8"
                      strokeWidth="2"
                    />
                    {/* Center Label */}
                    <text
                      x="100"
                      y="110"
                      fill="#ffffff"
                      fontSize="14"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {cubeSide}³ = {Math.pow(cubeSide, 3)}
                    </text>
                  </svg>
                </div>

                {/* Rusuk Slider */}
                <div className="w-full mt-2">
                  <div className="flex justify-between text-xs font-bold text-purple-900 mb-1">
                    <span>Panjang Rusuk (s): {cubeSide} cm</span>
                    <span>Volume: {Math.pow(cubeSide, 3)} cm³</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={cubeSide}
                    onChange={(e) => {
                      soundFX.playClick();
                      setCubeSide(parseInt(e.target.value));
                    }}
                    className="w-full accent-purple-600 cursor-pointer h-3"
                  />
                </div>
              </div>

              {/* Cube Math Concepts */}
              <div className="col-span-6 bg-slate-900 text-white p-4 rounded-2xl border-2 border-purple-400/40 space-y-3">
                <span className="text-xs font-black text-purple-400 uppercase tracking-wider">
                  Hubungan Pangkat Tiga dan Akar Kubik
                </span>

                <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300 font-semibold">Perkalian 3 Faktor Sama:</span>
                    <span className="font-black text-yellow-400">
                      {cubeSide} × {cubeSide} × {cubeSide}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300 font-semibold">Volume Kubus (V):</span>
                    <span className="font-black text-purple-300">
                      s³ = {Math.pow(cubeSide, 3)} cm³
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-700">
                    <span className="text-slate-300 font-semibold">Akar Pangkat Tiga (∛V):</span>
                    <span className="font-black text-emerald-400">
                      ∛{Math.pow(cubeSide, 3)} = {cubeSide} cm
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-slate-800 p-2 rounded-lg">
                    <span className="text-slate-400">1³ = 1</span>
                  </div>
                  <div className="bg-slate-800 p-2 rounded-lg">
                    <span className="text-slate-400">2³ = 8</span>
                  </div>
                  <div className="bg-slate-800 p-2 rounded-lg">
                    <span className="text-slate-400">3³ = 27</span>
                  </div>
                  <div className="bg-slate-800 p-2 rounded-lg">
                    <span className="text-slate-400">4³ = 64</span>
                  </div>
                  <div className="bg-slate-800 p-2 rounded-lg">
                    <span className="text-slate-400">5³ = 125</span>
                  </div>
                  <div className="bg-slate-800 p-2 rounded-lg">
                    <span className="text-slate-400">10³ = 1.000</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5">
              <span className="text-xs font-bold text-amber-900">
                💡 <strong>Kunci Ingatan:</strong> Pangkat tiga BUKAN dikali 3! Contoh: <code>4³ = 4 × 4 × 4 = 64</code> (bukan 4 × 3 = 12).
              </span>
            </div>
          </div>
        )}

        {/* ========================================================
            LEVEL 5 INTERACTIVE: PIZZA FRACTIONS & PERCENTAGES
            ======================================================== */}
        {level.id === 5 && (
          <div className="h-full flex flex-col justify-between">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-bold text-slate-700 text-sm flex items-center gap-2">
                <PieChart className="w-5 h-5 text-rose-600" />
                Chef Matematika: Potong Pizza & Konversi Pecahan, Desimal, Persen
              </span>
              <span className="text-xs font-medium text-slate-500">
                Klik potongan pizza untuk memilih bagian yang dimakan!
              </span>
            </div>

            <div className="grid grid-cols-12 gap-6 my-auto items-center">
              {/* Interactive Pizza Visualizer */}
              <div className="col-span-6 bg-rose-50 p-4 rounded-2xl border-2 border-rose-200 flex flex-col items-center">
                {/* Pizza Denominator Buttons */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-rose-900">Potong Jadi:</span>
                  {[2, 4, 8, 10].map((denom) => (
                    <button
                      key={denom}
                      onClick={() => {
                        soundFX.playClick();
                        setPizzaDenom(denom);
                        setSelectedSlices([0]);
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-extrabold ${
                        pizzaDenom === denom ? 'bg-rose-600 text-white' : 'bg-white border text-rose-900'
                      }`}
                    >
                      {denom} Bagian
                    </button>
                  ))}
                </div>

                {/* Interactive SVG Pizza with Slices */}
                <div className="w-44 h-44 relative">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                    {/* Crust Base */}
                    <circle cx="50" cy="50" r="46" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
                    <circle cx="50" cy="50" r="41" fill="#fef08a" />

                    {/* Slices */}
                    {Array.from({ length: pizzaDenom }, (_, idx) => {
                      const angle = 360 / pizzaDenom;
                      const startAngle = (idx * angle - 90) * (Math.PI / 180);
                      const endAngle = ((idx + 1) * angle - 90) * (Math.PI / 180);
                      const x1 = 50 + 40 * Math.cos(startAngle);
                      const y1 = 50 + 40 * Math.sin(startAngle);
                      const x2 = 50 + 40 * Math.cos(endAngle);
                      const y2 = 50 + 40 * Math.sin(endAngle);
                      const isTaken = selectedSlices.includes(idx);

                      return (
                        <path
                          key={idx}
                          d={`M 50 50 L ${x1} ${y1} A 40 40 0 0 1 ${x2} ${y2} Z`}
                          fill={isTaken ? '#ef4444' : '#fde047'}
                          stroke="#78350f"
                          strokeWidth="1.2"
                          onClick={() => {
                            soundFX.playClick();
                            setSelectedSlices((prev) =>
                              prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
                            );
                          }}
                          className="cursor-pointer hover:opacity-85 transition-opacity"
                        />
                      );
                    })}
                  </svg>
                </div>
                <span className="text-xs font-bold text-rose-800 mt-2">
                  Ketuk potongan untuk memilih (Merah = Dipilih)
                </span>
              </div>

              {/* Fraction Conversion Panel */}
              <div className="col-span-6 bg-slate-900 text-white p-4 rounded-2xl border-2 border-rose-300 space-y-3">
                <span className="text-xs font-black text-rose-400 uppercase tracking-wider">
                  Nilai Pecahan dan Kesetaraannya
                </span>

                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-semibold">Pecahan Biasa:</span>
                    <span className="font-black text-xl text-yellow-400">
                      {selectedSlices.length}/{pizzaDenom}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-semibold">Bentuk Desimal:</span>
                    <span className="font-black text-xl text-emerald-400">
                      {(selectedSlices.length / pizzaDenom).toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-semibold">Bentuk Persen:</span>
                    <span className="font-black text-xl text-sky-400">
                      {Math.round((selectedSlices.length / pizzaDenom) * 100)}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                    <span className="text-xs text-slate-300 font-semibold">Bagian Sisa:</span>
                    <span className="font-bold text-sm text-slate-400">
                      {pizzaDenom - selectedSlices.length}/{pizzaDenom} bagian
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5">
              <span className="text-xs font-bold text-amber-900">
                💡 <strong>Konversi Cepat:</strong> <code>1/2 = 0,5 = 50%</code>, <code>1/4 = 0,25 = 25%</code>, <code>3/4 = 0,75 = 75%</code>.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Help Tip */}
      <div className="text-center text-xs font-medium text-slate-500">
        Sentuh elemen layar untuk berinteraksi. Ketika sudah paham, klik tombol merah di atas untuk mulai menjawab 10 soal tantangan!
      </div>
    </div>
  );
};
