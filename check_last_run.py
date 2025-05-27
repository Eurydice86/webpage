import datetime
import main

file = "last_run.txt"

if file:
    with open(file, "r") as f:
        date_and_time = datetime.datetime.strptime(f.read(), "%m/%d/%Y, %H:%M:%S")
        print(date_and_time)

        if ((datetime.datetime.now() - date_and_time).total_seconds() // 60 // 60) > 12:
            print("More than 12 hours since last run")
            main.main()
            
            with open(file, "w") as f:
                f.write(datetime.datetime.now().strftime("%m/%d/%Y, %H:%M:%S"))
        else:
            print("Last run was less than 12 hours ago")

