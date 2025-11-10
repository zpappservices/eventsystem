import { GoBell, GoChevronRight } from "react-icons/go";

const RecentActivities = () => {
  const activities = [
    { id: 1, event: "Evolution Cup 2025", time: "5mins ago" },
    { id: 2, event: "Evolution Cup 2025", time: "5mins ago" },
    { id: 3, event: "Evolution Cup 2025", time: "5mins ago" },
  ];

  return (
    <div className="w-full max-w-[413px] rounded-[10px] bg-neutrals100/10 border p-6">
      <h2 className="text-base font-semibold text-baseBlack mb-4 flex items-center">
        Recent Activities
      </h2>

      <div className="space-y-4">
        {activities.map((activity) => {
          return (
            <div
              key={activity.id}
              className="flex items-center p-2 hover:bg-primary hover:shadow-primary400/30 transition-all hover:shadow-md group rounded-[10px] cursor-pointer"
            >
              <GoBell className="text-baseBlack rounded-[15px] p-0.5 group-hover:text-primary group-hover:bg-white mr-3 text-2xl" />

              <div className="flex-1">
                <p className="text-baseBlack font-medium group-hover:text-white">
                  Event Created: {activity.event}
                </p>
                <p className="text-gray-500 text-sm flex items-center group-hover:text-neutrals100">
                  {activity.time}
                </p>
              </div>

              <GoChevronRight className="mr-1 text-2xl group-hover:text-white" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivities;
