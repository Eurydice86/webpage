from src import weapon
from src import board
from src import competitions

import os


def main():
    if not os.path.exists("data"):
        os.makedirs("data")

    weapon.all_weapons()
    board.write_board_info()
    competitions.write_competitions()


if __name__ == "__main__":
    main()
