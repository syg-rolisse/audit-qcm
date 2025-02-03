import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../context/socket";

const useSocketEvents = () => {
  const [shouldRefreshThematique, setShouldRefreshThematique] = useState(false);
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return;

    const handleThematiqueAction = () => {
      setShouldRefreshThematique((prev) => !prev);
    };

    socket.on("thematique_created", handleThematiqueAction);
    socket.on("thematique_updated", handleThematiqueAction);
    socket.on("thematique_deleted", handleThematiqueAction);
    return () => {
      socket.off("thematique_created", handleThematiqueAction);
      socket.off("thematique_updated", handleThematiqueAction);
      socket.off("thematique_deleted", handleThematiqueAction);
    };
  }, [socket]);

  return { shouldRefreshThematique };
};

export default useSocketEvents;
