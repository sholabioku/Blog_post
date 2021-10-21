class AppController {
  static home(req, res) {
    res.status(200).json({ success: true });
  }

  static async post(req, res) {
    try {
      const { tags, sortBy, direction } = req.query;
      if (!tags) {
        res.status(400).json({ error: 'Tags parameter is required' });
      }

      const results = await axios.all(
        tags.split(',').map((tag) =>
          axios.get('https://api.hatchways.io/assessment/blog/posts', {
            params: { tag },
          })
        )
      );

      const posts = [
        ...new Set(
          results
            .flatMap((result) => result.data.posts)
            .map((item) => JSON.stringify(item))
        ),
      ].map((item) => JSON.parse(item));

      if (sortBy) {
        if (
          sortBy !== 'id' &&
          sortBy !== 'likes' &&
          sortBy !== 'popularity' &&
          sortBy !== 'reads'
        ) {
          return res.status(400).json({ error: 'sortBy parameter is invalid' });
        }
      }
      if (direction) {
        if (direction !== 'asc' && direction !== 'desc') {
          return res
            .status(400)
            .json({ error: 'direction parameter is invalid' });
        }
      }

      posts.sort((a, b) => {
        if (sortBy === 'id') {
          if (direction === 'desc') {
            return b.id - a.id;
          } else {
            return a.id - b.id;
          }
        }
        if (sortBy === 'likes') {
          if (direction === 'desc') {
            return b.likes - a.likes;
          } else {
            return a.likes - b.likes;
          }
        }
        if (sortBy === 'popularity') {
          if (direction === 'desc') {
            return b.popularity - a.popularity;
          } else {
            return a.popularity - b.popularity;
          }
        }
        if (sortBy === 'reads') {
          if (direction === 'desc') {
            return b.reads - a.reads;
          } else {
            return a.reads - b.reads;
          }
        }

        return a.id - b.id;
      });

      res.status(200).json({ posts });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AppController;
