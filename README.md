# Luxury Jewelry Brand - AR Ring

A premium luxury jewelry website featuring 3D product visualization, built with React, Three.js, and Tailwind CSS.

## Features

✨ **Premium UI/UX Design**
- Luxury-focused design with elegant typography (Cormorant Garamond & Montserrat)
- Smooth animations using Framer Motion
- Responsive layout for all devices
- Custom diamond loading animations

💎 **3D Product Viewer**
- Interactive 3D ring models using Three.js and React Three Fiber
- Orbit controls for 360° viewing
- Auto-rotate functionality
- Realistic diamond and gold material rendering
- Dynamic color changes based on gold type (White Gold, Rose Gold, Yellow Gold, Platinum)

🛍️ **Product Features**
- Product gallery with luxury jewelry items
- Detailed product pages with specifications
- Complete product information including:
  - Carat weight
  - Gold type
  - Total weight
  - Gemstone details
  - Clarity and color grades
  - Cut and dimensions
  - Price and certification info

📊 **Dashboard**
- Order tracking and history
- User statistics and loyalty points
- Quick actions for customer service
- Saved items management

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (Cormorant Garamond, Montserrat)

## Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Build for production:
\`\`\`bash
npm run build
\`\`\`

4. Preview production build:
\`\`\`bash
npm run preview
\`\`\`

## Project Structure

\`\`\`
src/
├── components/
│   ├── Navbar.jsx              # Navigation bar with active states
│   ├── DiamondLoader.jsx       # Animated diamond loading component
│   └── Ring3DViewer.jsx        # 3D ring visualization component
├── pages/
│   ├── Home.jsx                # Landing page with hero section
│   ├── Products.jsx            # Product gallery
│   ├── ProductDetail.jsx       # Individual product page with 3D viewer
│   └── Dashboard.jsx           # User dashboard
├── data/
│   └── products.js             # Product data and specifications
├── App.jsx                     # Main app component with routing
├── main.jsx                    # Entry point
└── index.css                   # Global styles and Tailwind setup
\`\`\`

## Customization

### Adding Products

Edit \`src/data/products.js\` to add new jewelry items. Each product should include:
- Name, category, price
- Image URL
- Carat weight, gold type, weight
- Gemstone details (clarity, color, cut, dimensions)
- Description

### Color Scheme

The luxury color palette is defined in \`tailwind.config.js\`:
- Gold: #D4AF37
- Dark Gold: #B8941C
- Cream: #F5F5DC
- Dark: #1A1A1A
- Dark Gray: #2D2D2D
- Light Gray: #F8F8F8

### 3D Models

The current implementation creates procedural 3D ring models. To use custom GLB/GLTF models:
1. Place your models in the \`public/models\` directory
2. Update the \`modelPath\` in product data
3. Modify \`Ring3DViewer.jsx\` to load external models using \`useGLTF\` from @react-three/drei

## Features in Detail

### Diamond Loading Animation
- Custom SVG diamond with gradient fills
- Rotating animation
- Sparkle particle effects
- Loading progress indicators

### 3D Ring Viewer
- Procedurally generated ring geometry
- Realistic diamond material with transmission and refraction
- Multiple accent diamonds around the band
- Prong settings
- Material colors adapt to gold type selection
- Interactive camera controls

### Product Detail Page
- Side-by-side 3D viewer and product information
- Comprehensive specifications grid
- Multiple view thumbnails
- Add to cart and consultation booking
- Certification and warranty information

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use for personal or commercial projects.

## Credits

- 3D rendering: Three.js
- Images: Unsplash (placeholder images)
- Fonts: Google Fonts
