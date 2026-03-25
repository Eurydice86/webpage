from src import weapon
from src import board
from src import competitions

import os
from dotenv import load_dotenv
from tqdm import tqdm


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

        steps = [
            ("Weapons", weapon.all_weapons),
            ("Board", board.write_board_info),
            ("Competitions", competitions.write_competitions),
        ]
        for name, func in tqdm(steps, desc="Overall progress", unit="step"):
            func()

        tqdm.write("\n✓ All data collections completed successfully")

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
