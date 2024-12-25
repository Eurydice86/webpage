from src import weapon
from src import board
from src import competitions

import os
if not os.path.exists("data"):
    os.makedirs("data")

if __name__ == "__main__":
    weapon.all_weapons()
    board.write_board_info()
    competitions.write_competitions()
