from src import weapon
from src import board
from src import competitions

import os
from dotenv import load_dotenv


def validate_environment():
    """Validate that required environment variables are set."""
    load_dotenv()

    mc_token = os.getenv("MC_TOKEN")
    if not mc_token:
        raise ValueError(
            "Error: MC_TOKEN environment variable not set.\n"
            "Please copy .env.example to .env and add your MyClub API token."
        )

    if not mc_token.strip():
        raise ValueError(
            "Error: MC_TOKEN is empty.\n"
            "Please add your MyClub API token to the .env file."
        )

    print("✓ Environment variables validated")
    return True


def main():
    try:
        # Validate environment variables before proceeding
        validate_environment()

        # Create data directory if it doesn't exist
        if not os.path.exists("data"):
            os.makedirs("data")
            print("✓ Created data directory")

        print("Running weapon data collection...")
        weapon.all_weapons()
        print("✓ Weapon data collection completed")

        print("Running board data collection...")
        board.write_board_info()
        print("✓ Board data collection completed")

        print("Running competitions data collection...")
        competitions.write_competitions()
        print("✓ Competitions data collection completed")

        print("\n✓ All data collections completed successfully")

    except ValueError as e:
        print(f"\n✗ Configuration Error: {e}")
        return False
    except Exception as e:
        print(f"\n✗ Error during data collection: {e}")
        import traceback
        traceback.print_exc()
        return False

    return True


if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
