/**
To make sure we only request data from the browser, we have to ensure that the components using hooks are only rendered on the client. this is accomplished  by creating a component that only renders its children in the browser and not on the server.
 */

import { useState, useEffect } from "react";

export default function ClientOnly({ children, ...delegated }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div {...delegated} style={{ width: "100%", marginTop: "-50px" }}>
      {children}
    </div>
  );
}
