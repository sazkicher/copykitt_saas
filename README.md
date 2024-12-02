# **Copykitt SaaS**

`Copykitt SaaS` is a lightweight, scalable SaaS platform for generating and managing marketing copy and logo using AI. Built with **React**/**Next.js**, this project leverages serverless APIs **AWS Lambda**, and **AWS Gateway**, seamless UI components, and modern AI integrations to provide a smooth user experience.

## **Features**

- 🌐 **Next.js Framework**: Full-stack React framework for scalability and performance.
- ⚙️ **Serverless API Proxy**: Efficiently handle API requests with Vercel’s serverless functions.
- 🤖 **AI Integration**: Generates creative content dynamically using AI-powered endpoints.
- 📈 **SaaS-Ready**: Easily scalable for multi-tenant deployments.

---

## **Getting Started**

### **Prerequisites**

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Vercel CLI](https://vercel.com/docs/cli) (optional for deployment)

---

### **Installation**

1. Clone this repository:

   ```bash
   git clone https://github.com/sazkicher/copykitt_saas.git
   cd copykitt_saas
  
2. Install dependencies:
   
    ```bash
    npm install
    # or
    yarn install

3. Set up environment variables:
    Create a `.env.local` file in the root directory.


    Add the following variables:
   
    ```bash
    API_ENDPOINT=https://your-api-endpoint.com

### **Running Locally**

Start the development server:

    ```bash
  npm run dev
  # or
  yarn dev

Visit http://localhost:3000 in your browser to view the application.


### **Project Structure**

.
├── public/             # Static assets (e.g., images, icons)
├── src/
│   ├── app/            # Next.js app directory with routing logic
│   │   ├── api/        # API proxy implementation
│   │   │   └── proxy/  # Serverless proxy functions
│   │   ├── components/ # UI components (e.g., Form, Results)
│   │   └── pages/      # Page-level components
│   ├── styles/         # Global and component-specific styles
│   └── utils/          # Utility functions
├── .env.local          # Local environment variables
├── package.json        # Dependencies and scripts
└── README.md           # Project documentation


### **Contributing**
Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.

