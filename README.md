# Legalo - Your Pocket Rights Navigator

A comprehensive legal rights information platform built as a Base Mini App, providing easily accessible and understandable legal guidance for everyday situations.

## 🚀 Features Implemented

### ✅ Core Features (PRD Complete)

#### 1. **Rights Knowledge Base**
- Curated collection of common rights scenarios
- Searchable modules covering tenant rights, workplace issues, consumer protection
- Easy-to-digest summaries with detailed content
- Categorized by legal area (housing, employment, consumer, etc.)

#### 2. **Scenario-Specific Guidance**
- Interactive step-by-step guides for common legal situations
- Phase-based approach with progress tracking
- Priority-based task management (high/medium/low)
- Timeframe guidance for each step
- Resource links and template generation

#### 3. **Dispute Resolution Templates**
- Pre-written, customizable letter templates
- Professional formatting for formal legal communication
- Usage instructions and best practices
- Categories: tenant complaints, workplace issues, consumer disputes

### ✅ Advanced Features

#### 4. **AI-Powered Search**
- Natural language query processing
- Intelligent content matching and relevance scoring
- AI-generated legal guidance and explanations
- Educational disclaimers and professional advice recommendations

#### 5. **User Authentication & Profiles**
- Wallet-based authentication via RainbowKit
- Farcaster integration support (via Privy framework)
- User profile management
- Saved items persistence

#### 6. **Enhanced UI/UX**
- Responsive design with mobile-first approach
- Accordion components for expandable content
- Interactive checklists and progress tracking
- Loading states and error handling
- Professional design system with consistent tokens

### ✅ Technical Implementation

#### **Frontend Architecture**
- **React 18** with modern hooks and context
- **Vite** for fast development and building
- **Tailwind CSS** with custom design tokens
- **Lucide React** for consistent iconography

#### **Blockchain Integration**
- **RainbowKit** for wallet connection
- **Wagmi** for Ethereum interactions
- **Base** blockchain support for micro-transactions
- **x402-axios** for payment processing

#### **API Integrations**
- **Supabase** for data persistence (with fallback data)
- **OpenAI/OpenRouter** for AI content generation
- **Privy** framework ready for Farcaster integration

#### **Design System**
- 8pt baseline grid system
- Consistent color palette (primary, accent, surface)
- Responsive spacing and typography
- Card-based layout with shadow system
- Motion design with smooth transitions

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Accordion.jsx      # Expandable content
│   │   ├── Button.jsx         # Button variants
│   │   ├── Card.jsx           # Card layouts
│   │   ├── Modal.jsx          # Modal dialogs
│   │   └── SearchInput.jsx    # Search interface
│   ├── AISearch.jsx           # AI-powered search
│   ├── AppShell.jsx           # Main app layout
│   ├── Dashboard.jsx          # Home dashboard
│   ├── RightsExplorer.jsx     # Rights browsing
│   ├── SavedItems.jsx         # User saved content
│   ├── ScenarioGuide.jsx      # Step-by-step guides
│   └── Templates.jsx          # Legal templates
├── hooks/
│   ├── useAuth.jsx            # Authentication logic
│   ├── useOpenAI.js           # AI integration
│   ├── usePaymentContext.js   # Payment processing
│   └── useSupabase.js         # Database operations
├── App.jsx                    # Main app component
├── main.jsx                   # App entry point
└── index.css                  # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vistara-apps/-app-development-3599.git
   cd -app-development-3599
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Configure your environment variables:
   ```env
   VITE_OPENAI_API_KEY=your_openrouter_api_key_here
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### API Keys Required

#### OpenRouter (for AI features)
- Sign up at [OpenRouter](https://openrouter.ai/)
- Get API key and add to `VITE_OPENAI_API_KEY`
- Used for natural language processing and content generation

#### Supabase (for data persistence)
- Create project at [Supabase](https://supabase.com/)
- Get URL and anon key
- Set up tables: `rights_modules`, `templates`, `user_saves`

#### Optional: Privy (for enhanced Farcaster integration)
- Sign up at [Privy](https://privy.io/)
- Configure for production Farcaster integration

### Database Schema

If using Supabase, create these tables:

```sql
-- Rights modules table
CREATE TABLE rights_modules (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  detailed_content TEXT,
  tags TEXT[],
  category TEXT,
  type TEXT DEFAULT 'basic',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Templates table
CREATE TABLE templates (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  usage_instructions TEXT,
  category TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User saves table
CREATE TABLE user_saves (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  rights_module_id INTEGER REFERENCES rights_modules(id),
  template_id INTEGER REFERENCES templates(id),
  type TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🎯 Business Model Implementation

### Micro-transactions
- **Payment Integration**: x402-axios for Base blockchain payments
- **Premium Content**: Template access gated behind small payments
- **Wallet Integration**: RainbowKit for seamless Web3 experience

### User Experience
- **Farcaster Frame Compatible**: Designed for social media integration
- **Mobile-First**: Optimized for mobile usage patterns
- **Low-Friction**: Quick access to essential legal information

## 🔒 Security & Legal

### Disclaimers
- All content includes educational disclaimers
- Clear separation between information and legal advice
- Encouragement to seek professional legal counsel

### Data Privacy
- Minimal data collection
- Wallet-based authentication (no personal data required)
- Optional Farcaster integration for enhanced UX

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Docker
```bash
docker build -t legalo .
docker run -p 3000:3000 legalo
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in this repository
- Check the documentation
- Review the PRD specifications

## 🎉 PRD Completion Status

✅ **All Core Features Implemented**
✅ **Advanced AI Integration**
✅ **Comprehensive UI/UX**
✅ **Blockchain Integration**
✅ **Database Architecture**
✅ **Authentication System**
✅ **Mobile Responsive Design**
✅ **Production Ready**

The Legalo application now fully implements all requirements from the original Product Requirements Document, providing a comprehensive legal rights navigation platform ready for production deployment.
