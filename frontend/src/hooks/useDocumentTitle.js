import { useEffect } from "react";

export default function useDocumentTitle(title) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | ${import.meta.env.VITE_APP_NAME || "LinkGhosta"}`;
    }
  }, [title]);
}
