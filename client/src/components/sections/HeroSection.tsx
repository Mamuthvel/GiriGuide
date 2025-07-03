interface HeroSectionProps {
  onStartGirivalam: () => void;
}

export default function HeroSection({ onStartGirivalam }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-saffron to-warm-orange text-white p-6 cultural-pattern">
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-2">Welcome Devotee!</h2>
        <p className="text-sm mb-4 opacity-90">Your spiritual journey companion</p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <svg className="w-8 h-8 mx-auto mb-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5z"/>
            </svg>
            <p className="text-xs font-medium">14 KM</p>
            <p className="text-xs opacity-80">Girivalam</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <svg className="w-8 h-8 mx-auto mb-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            <p className="text-xs font-medium">4-5 HRS</p>
            <p className="text-xs opacity-80">Duration</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <svg className="w-8 h-8 mx-auto mb-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 13c3.31 0 6 2.69 6 6H6v-6zM6 5c6.63 0 12 5.37 12 12h-2c0-5.52-4.48-10-10-10V5zm0-4C14.84 1 22 8.16 22 17h-2C20 9.27 13.73 3 6 3V1z"/>
            </svg>
            <p className="text-xs font-medium">28°C</p>
            <p className="text-xs opacity-80">Weather</p>
          </div>
        </div>
      </div>
    </section>
  );
}
