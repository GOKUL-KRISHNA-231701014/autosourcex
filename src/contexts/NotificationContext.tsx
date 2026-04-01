import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";

export interface Notification {
  id: string;
  type: "new_quote" | "rfq_awarded" | "rfq_update" | "system";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  link?: string;
  rfqId?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (n: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

const initialNotifications: Notification[] = [
  {
    id: "n1", type: "new_quote", title: "New Quote Received",
    message: "Precision Auto Parts submitted a quote for RFQ-2846 (Cylinder Head Assembly)",
    timestamp: new Date(Date.now() - 1000 * 60 * 12), read: false, link: "/rfq/RFQ-2846", rfqId: "RFQ-2846",
  },
  {
    id: "n2", type: "new_quote", title: "New Quote Received",
    message: "GearBox Pro submitted a quote for RFQ-2846 (Cylinder Head Assembly)",
    timestamp: new Date(Date.now() - 1000 * 60 * 45), read: false, link: "/rfq/RFQ-2846", rfqId: "RFQ-2846",
  },
  {
    id: "n3", type: "rfq_awarded", title: "RFQ Awarded",
    message: "You awarded RFQ-2791 to TechDrive Systems. Supplier has been notified.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), read: true, link: "/rfq/RFQ-2791", rfqId: "RFQ-2791",
  },
  {
    id: "n4", type: "rfq_update", title: "RFQ Deadline Approaching",
    message: "RFQ-2846 closes in 2 days. You have 4 quotes to review.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), read: true, link: "/rfq/RFQ-2846", rfqId: "RFQ-2846",
  },
  {
    id: "n5", type: "new_quote", title: "New Quote Received",
    message: "MetalWorks India submitted a quote for RFQ-2846",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), read: true, link: "/rfq/RFQ-2846", rfqId: "RFQ-2846",
  },
];

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addNotification = useCallback(
    (n: Omit<Notification, "id" | "timestamp" | "read">) => {
      const newNotif: Notification = {
        ...n,
        id: `n-${Date.now()}`,
        timestamp: new Date(),
        read: false,
      };
      setNotifications((prev) => [newNotif, ...prev]);

      toast({
        title: n.title,
        description: n.message,
      });
    },
    []
  );

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, addNotification, markAsRead, markAllAsRead, clearAll }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
}
