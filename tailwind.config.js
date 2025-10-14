/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'voxel-blue': '#4A90E2',
        'voxel-green': '#7ED321',
        'voxel-purple': '#BD10E0',
        'voxel-orange': '#F5A623',
      },
    },
  },
  plugins: [],
}
