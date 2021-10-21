
export default class AppController {
  static home(req, res) {
    res.status(200).json({ success: true });
  }
}