# Jade GovernAI - Infrastructure Governance & Cost Control

## Overview
Jade GovernAI is an AI-driven, vendor-neutral infrastructure governance platform built on Policy-as-Code. Designed specifically for the Healthcare & Life Sciences (HLS) domain, it intelligently analyzes cloud usage patterns, recommends optimal policies, and prevents non-compliant provisioning through self-service, pre-approved infrastructure blueprints.

### The Problem
Enterprises face uncontrolled cloud spend, frequent policy violations, and inconsistent infrastructure standards across teams and vendors. This leads to higher operational costs, compliance risks, and slower delivery times.

### The Solution
Jade GovernAI enables organizations to proactively control costs, enforce governance without slowing innovation, and simplify compliance. The outcome is reduced cloud waste, stronger regulatory adherence (HIPAA, SOC 2, ISO 27001), faster time-to-market, and measurable ROI through operational efficiency.

## MVP Scope Achieved (100% Completed)
The following core features have been fully implemented and are responsive across desktop, tablet, and mobile devices:

1. **Real-time Compliance Monitoring Dashboard:** Live tracking of compliance scores, active violations, prevented deployments, and customizable team routing for alerts (Security, Finance, IT, DevOps).
2. **Automated Compliance Reporting & Audit Trail:** Immutable logs of policy changes, deployment blocks, and exceptions with expandable raw JSON metadata. Includes a generated reports table for downloading executive summaries and detailed audits.
3. **AI-Driven Cost Management:** Tracks cost vs. waste trends and resource utilization. Provides AI-driven recommendations (e.g., right-sizing EC2 instances) with estimated savings and effort levels.
4. **Policy-as-Code & Self-Service Blueprints:** A catalog of pre-approved, secure infrastructure templates (e.g., HLS Secure Web App). Users can view the underlying Terraform code and simulate deployments.
5. **Vendor-Neutral Cloud Integrations:** Connect and manage multi-cloud (AWS, Azure, GCP) and hybrid environments from a single pane of glass.
6. **Interactive Product Tour & Onboarding:** A guided product tour (`react-joyride`) for new users, alongside a complete authentication and cloud provider selection onboarding flow.
7. **Fully Responsive UI/UX:** Seamless experience across all device sizes, prioritizing mobile usability with collapsible sidebars, fluid data tables, and touch-friendly modals.

## Software Requirements & Prerequisites
Before you begin, ensure you have met the following requirements:
* **Node.js:** Version 18.0.0 or higher.
* **Package Manager:** `npm` (v8+), `yarn`, or `pnpm`.
* **Web Browser:** Modern web browser (Chrome, Firefox, Safari, Edge).
* **Git:** For cloning the repository.

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## How to Run the Application

### Development Mode
To start the local development server with hot-module replacement (HMR):
```bash
npm run dev
```
The application will be available at `http://localhost:3000` (or the port specified in your terminal).

### Production Build
To build the application for production:
```bash
npm run build
```
This will generate optimized static files in the `dist` directory.

To preview the production build locally:
```bash
npm run preview
```

## Tech Stack
* **Frontend Framework:** React 18 (Vite)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM
* **Data Visualization:** Recharts
* **Icons:** Lucide React
* **Interactive Tours:** React Joyride
