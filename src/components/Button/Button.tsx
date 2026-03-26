import React, { ButtonHTMLAttributes, ReactNode } from "react";

// Define the custom props interface by extending standard HTML button attributes
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Optional variant prop for different styling (e.g., 'primary', 'secondary')
   */
  variant?: "primary" | "secondary" | "danger";
  /**
   * The content inside the button
   */
  children: ReactNode;
}

/**
 * A reusable Button component.
 *
 * @param {ButtonProps} props
 */
const Button = ({
  variant = "primary",
  children,
  className = "",
  ...rest
}: ButtonProps) => {
  // Add styling based on the variant (using template literals for example CSS classes)
  const baseStyle =
    "px-4 py-2 rounded font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75";

  let variantStyle = "";
  switch (variant) {
    case "primary":
      variantStyle =
        "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500";
      break;
    case "secondary":
      variantStyle =
        "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400";
      break;
    case "danger":
      variantStyle =
        "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500";
      break;
  }

  // Merge the base styles, variant styles, and any additional classNames passed in
  const combinedClassName = `${baseStyle} ${variantStyle} ${className}`.trim();

  return (
    <button className={combinedClassName} {...rest}>
      {children}
    </button>
  );
};

export default Button;
