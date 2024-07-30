      // Creates a book in the database
      const updateBookmarks = async (book: any) => {
        const response = await fetch(`api/user/bookmarks`, {
          method: "POST",
          body: JSON.stringify(book),
        });

        if (!response.ok) {
          throw new Error(
            "Error occurred while attempting to create a book in the db"
          );
        }

        const details: any = response.json();

        console.log({
          message: details.message,
          book: details.book,
        });

        // Directly update the user's bookmarks array using $addToSet
        await userCollection.updateOne(
          { _id: new mongoose.Types.ObjectId(userId) },
          { $addToSet: { bookmarks: details._id } }
        );
      };