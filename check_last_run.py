import datetime

file = "last_run.txt"

if file:
    with open(file, "r") as f:
        date_and_time = datetime.datetime.strptime(f.read(), "%m/%d/%Y, %H:%M:%S")
        print(date_and_time)

        if ((datetime.datetime.now() - date_and_time).total_seconds() // 60 // 60) > 12:
            print("yass queen")
            
            
            with open(file, "w") as f:
                f.write(datetime.datetime.now().strftime("%m/%d/%Y, %H:%M:%S"))
        else:
            print("naaaahhh")
