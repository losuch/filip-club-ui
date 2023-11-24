import React, { createContext, useContext, useState } from 'react';

type State = Object;

export const TemplateContext = createContext<
  { accessTemplatefield: any; setTemplatefield: any } | undefined
>(undefined);

export const TemplateContextProvider = ({ children }) => {
  const [accessTemplatefield, setTemplatefield] = useState<any>();

  return (
    <TemplateContext.Provider value={{ accessTemplatefield, setTemplatefield }}>
      {children}
    </TemplateContext.Provider>
  );
};

const useTemplateContext = () => {
  const context = useContext(TemplateContext);
  if (context === undefined) {
    console.log('Templates are empty');
    // throw new Error("useCount must be used within a CountProvider");
  }
  return [context?.accessTemplatefield, context?.setTemplatefield];
};

export default useTemplateContext;
