module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      // Custom breakpoints - mobile first approach
      'xs': '0px',     // Extra small devices
      'sm': '640px',     // Small devices (default)
      'md': '768px',     // Medium devices (default)
      'lg': '1024px',    // Large devices (default)
      'xl': '1280px',    // Extra large devices (default)
      '2xl': '1536px',   // 2X Extra large devices (default)
      
      // Custom breakpoints for specific use cases
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
      
      // Max-width breakpoints (max-width media queries)
      'max-sm': {'max': '639px'},
      'max-md': {'max': '767px'},
      'max-lg': {'max': '1023px'},
      'max-xl': {'max': '1279px'},
      
      // Custom range breakpoints (min and max)
      'sm-to-lg': {'min': '640px', 'max': '1023px'},
      'md-to-xl': {'min': '768px', 'max': '1279px'},
      
      // Portrait and landscape orientations
      'portrait': {'raw': '(orientation: portrait)'},
      'landscape': {'raw': '(orientation: landscape)'},
      
      // High resolution displays
      'retina': {'raw': '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'},
    },
    extend: {
      // You can extend other theme properties here
    },
  },
  plugins: [],
}
