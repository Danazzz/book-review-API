const prisma = require("../config/db");

// Create a new profile
const createProfile = async (req, res) => {
  // #swagger.tags = ['Profile']
  /* #swagger.security = [{
        "bearerAuth": []
    }] */
  const { firstName, lastName, bio, avatar } = req.body;
  try {
    const profile = await prisma.profile.create({
      data: {
        firstName,
        lastName,
        bio,
        avatar,
        user: { connect: { id: req.user.id } }, // Connect profile to the user
      },
    });
    res.status(201).json(profile);
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get profile by user ID
const getProfile = async (req, res) => {
  // #swagger.tags = ['Profile']
  /* #swagger.security = [{
        "bearerAuth": []
    }] */
  const userId = req.user.id;
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId },
      include: { user: true }, // Include the associated user data
    });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    console.error("Error getting profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update profile by user ID
const updateProfile = async (req, res) => {
  // #swagger.tags = ['Profile']
  /* #swagger.security = [{
        "bearerAuth": []
    }] */
  const userId = req.user.id;
  const { firstName, lastName, bio, avatar } = req.body;
  try {
    const updatedProfile = await prisma.profile.update({
      where: { userId },
      data: { firstName, lastName, bio, avatar },
    });
    res.json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete profile by user ID
const deleteProfile = async (req, res) => {
  // #swagger.tags = ['Profile']
  /* #swagger.security = [{
        "bearerAuth": []
    }] */
  const userId = req.user.id;
  try {
    await prisma.profile.delete({ where: { userId } });
    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createProfile, getProfile, updateProfile, deleteProfile };
