// Indonesian Text-to-Speech (TTS) manager using Web Speech API
type StateChangeCallback = (state: { speaking: boolean; paused: boolean; text: string }) => void;

class SpeechNarration {
  private synth: SpeechSynthesis | null = null;
  private indonesianVoice: SpeechSynthesisVoice | null = null;
  private isEnabled: boolean = true;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentText: string = '';
  private listeners: Set<StateChangeCallback> = new Set();
  private hasInitializedVoices: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return;

    // Look for Indonesian voice (id-ID or id_ID)
    const idVoice = voices.find(
      (v) => v.lang.toLowerCase().startsWith('id') || v.lang.toLowerCase().includes('indonesia')
    );
    if (idVoice) {
      this.indonesianVoice = idVoice;
    } else {
      // Fallback to default or English if no ID voice
      this.indonesianVoice = voices[0];
    }
    this.hasInitializedVoices = true;
  }

  public subscribe(cb: StateChangeCallback) {
    this.listeners.add(cb);
    cb({
      speaking: this.synth ? this.synth.speaking : false,
      paused: this.synth ? this.synth.paused : false,
      text: this.currentText,
    });
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    const state = {
      speaking: this.synth ? this.synth.speaking : false,
      paused: this.synth ? this.synth.paused : false,
      text: this.currentText,
    };
    this.listeners.forEach((cb) => cb(state));
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (!enabled) {
      this.stop();
    }
  }

  public getEnabled(): boolean {
    return this.isEnabled;
  }

  public speak(text: string, onEnd?: () => void) {
    if (!this.isEnabled || !this.synth) return;

    // Clean text of technical markup or mathematical symbols into spoken Indonesian
    const cleanText = text
      .replace(/°C/g, ' derajat Celsius')
      .replace(/cm³/g, ' sentimeter kubik')
      .replace(/Rp\s?([0-9.,]+)/g, '$1 rupiah')
      .replace(/\//g, ' per ')
      .replace(/\^3/g, ' pangkat tiga')
      .replace(/³/g, ' pangkat tiga')
      .replace(/²/g, ' kuadrat')
      .replace(/×/g, ' kali ')
      .replace(/÷/g, ' bagi ')
      .replace(/=/g, ' sama dengan ');

    this.stop();

    if (!this.hasInitializedVoices) {
      this.initVoices();
    }

    try {
      const utter = new SpeechSynthesisUtterance(cleanText);
      if (this.indonesianVoice) {
        utter.voice = this.indonesianVoice;
      }
      utter.lang = 'id-ID';
      utter.rate = 1.0; // Clear friendly speed for SD students
      utter.pitch = 1.05; // Slightly cheerful and engaging

      utter.onstart = () => {
        this.currentText = text;
        this.notify();
      };

      utter.onend = () => {
        this.currentText = '';
        this.notify();
        if (onEnd) onEnd();
      };

      utter.onerror = () => {
        this.currentText = '';
        this.notify();
      };

      this.currentUtterance = utter;
      this.synth.speak(utter);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }

  public pause() {
    if (this.synth && this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
      this.notify();
    }
  }

  public resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
      this.notify();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.currentText = '';
      this.notify();
    }
  }

  public repeat() {
    if (this.currentUtterance && this.currentText) {
      this.speak(this.currentText);
    }
  }

  public isAvailable(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }
}

export const speechNarration = new SpeechNarration();
