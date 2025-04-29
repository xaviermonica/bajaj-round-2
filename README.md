# Dynamic Form Application

A React-based dynamic form application that allows students to log in, fetch a dynamic form structure from an API, and fill it out section by section. The form is rendered and validated based on metadata received from the backend.

---

## 🚀 Features

- **User Login**: Students log in using their roll number and name.
- **Dynamic Form Rendering**: Form structure is fetched from an API and rendered on the fly.
- **Section-Based Navigation**: Navigate between sections with "Previous" and "Next" buttons.
- **Dynamic Validation**: Fields are validated based on metadata (e.g., required, min/max length).
- **Final Submission**: All collected form data is logged to the console on final submit.

---

## 📡 API Endpoints

### 1. User Registration
- **Endpoint**: `POST /create-user`
- **Description**: Registers a new user.
- **Payload**:
  ```json
  {
    "rollNumber": "your_roll_number",
    "name": "your_name"
  }
  ```

### 2. Fetch Form
- **Endpoint**: `GET /get-form?rollNumber=your_roll_number`
- **Description**: Fetches the dynamic form structure for the user.

---

## 🧾 Form Structure

```ts
interface FormResponse {
  message: string;
  form: {
    formTitle: string;
    formId: string;
    version: string;
    sections: FormSection[];
  };
}

interface FormSection {
  sectionId: number;
  title: string;
  description: string;
  fields: FormField[];
}

interface FormField {
  fieldId: string;
  type: "text" | "tel" | "email" | "textarea" | "date" | "dropdown" | "radio" | "checkbox";
  label: string;
  placeholder?: string;
  required: boolean;
  dataTestId: string;
  validation?: {
    message: string;
  };
  options?: Array<{
    value: string;
    label: string;
    dataTestId?: string;
  }>;
  maxLength?: number;
  minLength?: number;
}
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── LoginForm.tsx         # Handles user login
│   ├── DynamicForm.tsx       # Renders the dynamic form
│   ├── FormSection.tsx       # Renders individual form sections
│   ├── FormField.tsx         # Renders individual form fields
├── services/
│   ├── api.ts                # API service layer
├── types/
│   ├── index.ts              # TypeScript type definitions
├── App.tsx                   # Main application component
├── index.tsx                 # React entry point
├── index.css                 # Global styles
```

---

## ⚙️ Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/xaviermonica/bajaj-round-2.git
   cd bajaj-round-2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open the app in your browser:
   ```
   http://localhost:3000
   ```

---

## 📜 Scripts

- **Start Development Server**: `npm start`
- **Run Tests**: `npm test`
- **Build for Production**: `npm run build`

---

## 🛠️ Technologies Used

- **React**: Frontend library
- **TypeScript**: Type safety
- **Axios**: API integration
- **Jest**: Unit testing
- **CSS**: Styling

---
