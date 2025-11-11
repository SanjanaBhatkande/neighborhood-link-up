import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Check, X, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = () => {
      const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      const now = new Date();
      const today = now.toISOString().split("T")[0];

      const bookingNotifications = bookings.map((b, i) => ({
        id: i + 1,
        title: "Booking Confirmed",
        message: `Your booking with ${b.provider} for ${b.service} on ${b.date} (${b.slot}) is confirmed.`,
        time: new Date(b.bookedAt || now).toLocaleString(),
        read: false,
        type: "success",
      }));

      const todayReminders = bookings
        .filter((b) => b.date === today)
        .map((b, i) => ({
          id: bookings.length + i + 1,
          title: "Today's Booking Reminder",
          message: `You have a booking with ${b.provider} today (${b.slot}).`,
          time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          read: false,
          type: "info",
        }));

      setNotifications([...bookingNotifications, ...todayReminders]);
    };

    loadNotifications();
    const interval = setInterval(loadNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  const markAllAsRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const removeNotification = (id) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <Card className="absolute right-0 top-12 w-96 max-h-[500px] overflow-hidden z-50 shadow-2xl">
            <div className="p-4 border-b flex items-center justify-between bg-muted/30">
              <h3 className="font-semibold text-lg">Notifications</h3>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  Mark all read
                </Button>
              )}
            </div>

            <div className="overflow-y-auto max-h-[400px]">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No notifications</p>
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-4 border-b hover:bg-muted/50 ${
                      !n.read ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm mb-1">
                          {n.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{n.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                      </div>
                      <div className="flex gap-1">
                        {!n.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => markAsRead(n.id)}
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => removeNotification(n.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default Notifications;
