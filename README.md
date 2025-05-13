# Product Customizer

A React application that allows users to customize products, save designs, and add items to cart.

## Overview

This Product Customizer is a web application that simulates an e-commerce product customization experience. Users can select different products (T-shirts, Water Bottles, Stickers, etc.), customize them with various options like color, size, and text, and see a real-time preview of their customizations.

## Features

- **Product Selection**: Choose from various products (T-shirts, Water Bottles, Stickers, etc.)
- **Dynamic Options**: Different products have different customization options
- **Real-time Preview**: See your customizations update in real-time
- **Save Designs**: Save your customized products to revisit later
- **Load Saved Designs**: Browse, load, and edit previously saved designs
- **Delete Saved Designs**: Remove designs you no longer want
- **Add to Cart**: Simulate adding customized products to cart
- **Validation**: Ensures all required options are selected before saving or adding to cart

## Technologies Used

- **React**: For building the user interface with functional components
- **TypeScript**: For static typing and improved developer experience
- **CSS Modules**: For component-scoped styling
- **localStorage**: To simulate a backend for storing saved designs

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/personalize-it.git
   ```

2. Navigate to the project folder:
   ```
   cd personalize-it
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── assets/            # Images and other static assets
├── components/        # React components
│   ├── ActionBar/     # Buttons for actions (Save, Load, Add to Cart)
│   ├── LivePreview/   # Real-time preview of customizations
│   ├── LoadDesignModal/ # Modal for loading saved designs
│   ├── OptionForm/    # Form for product customization options
│   ├── ProductSelector/ # Dropdown for product selection
│   └── SaveDesignModal/ # Modal for saving designs
├── data/              # Mock data (product information)
├── hooks/             # Custom React hooks
│   ├── useDesignManager.ts # Hook for managing saved designs
│   ├── useMessage.ts  # Hook for displaying notifications
│   └── usePersistedState.ts # Hook for localStorage persistence
├── services/          # Service layers
│   ├── configurationService.ts # Service for managing saved designs
│   └── storageService.ts # Service for localStorage operations
├── styles/            # Global styles
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
    ├── productUtils.ts # Functions for working with products
    └── validationUtils.ts # Functions for input validation
```

## My Approach

I approached this project with a focus on creating a clean, maintainable codebase following modern React best practices:

1. **Component Structure**: I divided the UI into focused, reusable components following the single responsibility principle.

2. **Custom Hooks**: I extracted stateful logic into custom hooks to improve reusability and separation of concerns:
   - `usePersistedState`: For optionally persisting state to localStorage
   - `useMessage`: For managing notification messages
   - `useDesignManager`: For handling design saving, loading, and deleting

3. **Service Layer**: I created service modules to separate business logic from UI:
   - `storageService`: Centralized localStorage operations with error handling
   - `configurationService`: Managed saved design operations

4. **Type Safety**: Used TypeScript interfaces for all components and data structures to ensure type safety and improve developer experience.

5. **User Experience**: Focused on intuitive flow with real-time preview, validation messages

## Assumptions Made

1. **Product Structure**: I assumed products would have consistent structure but varying options.

2. **Required Options**: I assumed that options with a values array are required, while options without values (like text inputs) are optional.

3. **Image Paths**: I assumed that product images would be pre-loaded and available from an assets directory.

4. **User Flow**: I assumed users would want to save multiple designs and potentially revisit them later, so I implemented a design management system.

5. **Mobile Usage**: I assumed users might access the application on mobile devices, so I made the UI responsive.

## Future Improvements

With more time, I would enhance the application in the following ways:

1. **Testing**: 
   - Add comprehensive unit and integration tests using Jest and React Testing Library.
   - Run the app through Lighthouse and various HTML and CSS validators

2. **Enhanced Validation**: Add more sophisticated validation, including custom text validation rules.

3. **Accessibility**: Improve accessibility with better keyboard navigation, ARIA attributes, and screen reader support.

4. **UI Enhancements**:
   - Add animations for smoother transitions
   - Improve mobile responsiveness
   - Implement drag-and-drop for text positioning
   - Implement a CSS framework like Tailwind CSS, Material UI, or Bootstrap for a more polished UI
   - style modals to be more consistent with the rest of the contents
   - refactor some naming conventions for css classes
   - adjust image sizing and improve empty whitespace

5. **Additional Features**:
   - User accounts and authentication
   - Design sharing capabilities
   - Image upload for custom designs
   - More products related to the gym theme and more customization options.
   - Deploy with GH-Pages

6. **Performance Optimization**:
   - Implement code splitting
   - Optimize image loading
   - Add caching strategies

7. **Backend Integration**:
   - Replace localStorage with a real backend API
