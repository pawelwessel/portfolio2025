"use client";
import {
  FaCalendar,
  FaCheckCircle,
  FaClock,
  FaDollarSign,
  FaChartLine,
  FaStar,
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaRocket,
  FaCrown,
  FaShieldAlt,
  FaTrendingUp,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import { formatPLNFromCents } from "@/lib/utils";

export default function DashboardOverview({
  dashboardData,
  getStatusColor,
  getStatusText,
  setActiveTab,
}) {
  const { user } = useSelector((state) => state.user);

  // Calculate real stats from user data
  const calculateUserStats = () => {
    if (!user) return {};

    const totalServices = user.services?.length || 0;
    const totalPayments = user.payments?.length || 0;
    const totalSpent =
      user.payments?.reduce((sum, payment) => {
        return payment.result === "paid" ? sum + payment.amount : sum;
      }, 0) || 0;
    const averageSpentPerService =
      totalServices > 0 ? Math.round(totalSpent / totalServices) : 0;

    // Calculate this month's data
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonthPayments =
      user.payments?.filter((payment) => {
        const paymentDate = new Date(payment.date);
        return (
          paymentDate.getMonth() === currentMonth &&
          paymentDate.getFullYear() === currentYear &&
          payment.result === "paid"
        );
      }) || [];
    const thisMonthSpent = thisMonthPayments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

    return {
      totalServices,
      totalPayments,
      totalSpent,
      thisMonthSpent,
      averageSpentPerService,
      completedServices:
        user.payments?.filter((p) => p.result === "paid").length || 0,
      pendingServices:
        user.payments?.filter((p) => p.result === "pending").length || 0,
    };
  };

  // Get top services from user's actual services
  const getTopServices = () => {
    if (!user?.services) return [];

    return user.services.slice(0, 4).map((service) => ({
      name: service.real_name,
      price: service.price,
      duration: service.duration,
      description: service.description,
    }));
  };

  // Get recent payments
  const getRecentPayments = () => {
    if (!user?.payments) return [];

    return user.payments
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)
      .map((payment) => ({
        id: payment.date,
        service: "Usługa kosmetyczna",
        specialist: user.name,
        date: new Date(payment.date).toLocaleDateString("pl-PL"),
        time: new Date(payment.date).toLocaleTimeString("pl-PL", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: payment.result,
        price: payment.amount,
        duration: 60,
        location: user.location?.address || "Nie określono",
      }));
  };

  const userStats = calculateUserStats();
  const topServices = getTopServices();
  const recentPayments = getRecentPayments();

  return (
    <div className="space-y-6">
      {/* Subscription Prompt - Show only if not subscribed */}

      {/* User Profile Summary */}
      <Card className="shadow-sm rounded-xl">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-primary-foreground">
                <FaUser className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle className="text-xl heading-font">
                {user?.name || "Nie określono"}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <FaEnvelope className="h-3 w-3" />
                {user?.email || "Brak email"}
              </CardDescription>
              {user?.phoneNumber && (
                <CardDescription className="flex items-center gap-2">
                  <FaPhone className="h-3 w-3" />
                  {user.phoneNumber}
                </CardDescription>
              )}
              {user?.location?.address && (
                <CardDescription className="flex items-center gap-2">
                  <FaMapMarkerAlt className="h-3 w-3" />
                  {user.location.address}
                </CardDescription>
              )}
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center space-y-1">
              <p className="text-sm text-muted-foreground">Status konta</p>
              <Badge
                variant={
                  user?.subscription?.status === "active" ||
                  user?.premiumActive ||
                  user?.active
                    ? "default"
                    : "destructive"
                }
              >
                {user?.subscription?.status === "active" ||
                user?.premiumActive ||
                user?.active
                  ? "Premium"
                  : "Darmowe"}
              </Badge>
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm text-muted-foreground">Typ profilu</p>
              <Badge variant="outline">
                {user?.seek ? "Specjalista" : "Salon"}
              </Badge>
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm text-muted-foreground">
                Email zweryfikowany
              </p>
              <Badge variant={user?.emailVerified ? "default" : "destructive"}>
                {user?.emailVerified ? "Tak" : "Nie"}
              </Badge>
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm text-muted-foreground">
                Profil skonfigurowany
              </p>
              <Badge variant={user?.configured ? "default" : "destructive"}>
                {user?.configured ? "Tak" : "Nie"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="shadow-sm rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <FaCalendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Wszystkie usługi
                </p>
                <p className="text-2xl font-bold">{userStats.totalServices}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <FaCheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Ukończone płatności
                </p>
                <p className="text-2xl font-bold">
                  {userStats.completedServices}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <FaUser className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Odwiedzający w ciągu ostatnich 24 godzin
                </p>
                <p className="text-2xl font-bold">{userStats.totalVisitors}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <FaClock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Oczekujące
                </p>
                <p className="text-2xl font-bold">
                  {userStats.pendingServices}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
        {/* This Month Stats */}
        {/* <div className="professional-card p-3 md:p-4">
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <FaChartLine className="text-base md:text-lg text-primary-600" />
            <h2 className="text-sm md:text-base font-semibold text-neutral-900">
              Ten miesiąc
            </h2>
          </div>
          <div className="space-y-1 md:space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs md:text-sm text-neutral-600">
                Płatności
              </span>
              <span className="font-semibold text-neutral-900 text-xs md:text-sm">
                {userStats.totalPayments}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs md:text-sm text-neutral-600">
                Wydatki
              </span>
              <span className="font-semibold text-neutral-900 text-xs md:text-sm">
                {userStats.thisMonthSpent} zł
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs md:text-sm text-neutral-600">
                Średnia na usługę
              </span>
              <span className="font-semibold text-neutral-900 text-xs md:text-sm">
                {userStats.averageSpentPerService} zł
              </span>
            </div>
          </div>
        </div> */}

        {/* Top Services */}
        <div className="professional-card p-3 md:p-4 rounded-xl shadow-sm bg-card">
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <FaStar className="text-base md:text-lg text-primary-600" />
            <h2 className="text-sm md:text-base font-semibold text-neutral-900">
              Najczęściej wykonywane usługi
            </h2>
          </div>
          <div className="space-y-1 md:space-y-2">
            {topServices.length > 0 ? (
              topServices.map((service, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-xs md:text-sm text-neutral-600 truncate flex-1 mr-2">
                    {service.name}
                  </span>
                  <div className="text-right flex-shrink-0">
                    <span className="font-semibold text-neutral-900 text-xs md:text-sm">
                      {service.price} zł
                    </span>
                    <p className="text-xs text-neutral-600">
                      {service.duration} min
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-neutral-600 text-xs">Brak dodanych usług</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="professional-card p-3 md:p-4 rounded-xl shadow-sm bg-card">
        <h2 className="text-sm md:text-base font-semibold text-neutral-900 mb-2 md:mb-4">
          Ostatnie płatności
        </h2>
        <div className="space-y-2 md:space-y-3">
          {recentPayments.length > 0 ? (
            recentPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex flex-col sm:flex-row sm:items-start justify-between p-2 md:p-3 bg-neutral-50 rounded-md gap-2"
              >
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaDollarSign className="text-xs md:text-sm text-primary-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-neutral-900 text-xs md:text-sm truncate">
                      {payment.service}
                    </h3>
                    <p className="text-neutral-600 text-xs truncate">
                      {payment.specialist}
                    </p>
                    <p className="text-neutral-600 text-xs">
                      {payment.date} o {payment.time} • {payment.duration} min
                    </p>
                    <p className="text-neutral-600 text-xs truncate">
                      📍 {payment.location}
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      payment.status
                    )}`}
                  >
                    {getStatusText(payment.status)}
                  </span>
                  <p className="text-neutral-900 font-semibold mt-1 text-xs md:text-sm">
                    {formatPLNFromCents(payment.price)} zł
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-neutral-600 text-xs text-center py-3">
              Brak historii płatności
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
