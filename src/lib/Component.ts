// src/core/Component.ts
export default interface Component {
  /**
   * Renders the component's HTML structure as a string.
   */
  render(): string;

  /**
   * Called after the component's HTML is added to the DOM.
   * Use this method to attach event listeners and perform initial setup.
   */
  mount(): void;
}
