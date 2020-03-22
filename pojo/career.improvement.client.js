class OnLogEvent {
  constructor(entry, careerImprovementClient) {
    this.logged = entry.copy();
    this.careerImprovementClient = careerImprovementClient;
  }
}

class OnLogRemovedEvent {
  constructor(entry, careerImprovementClient) {
    this.removed = entry.copy();
    this.careerImprovementClient = careerImprovementClient;
  }
}

export const type = "careerimprovementclient";

export class CareerImprovementClient {
  constructor(email, username) {
    this.hardWorkEntries = [];
    this.onLogAddListeners = [];
    this.onLogRemovedListeners = [];
    this.type = type;
    this.email = email;
    this.username = username;
    this.id = null;
  }

  getUsername() {
    return this.username;
  }

  getEmail() {
    return this.email;
  }

  equals(object) {
    return true;
  }

  contains(toCheck) {
    let containsEntry = false;
    for (let i = 0; i < this.hardWorkEntries.length; i++) {
      const hardWorkEntry = this.hardWorkEntries[i];

      if (hardWorkEntry.equals(toCheck)) {
        containsEntry = true;
        break;
      }
    }
    return containsEntry;
  }

  log(hardWorkEntry) {
    if (!hardWorkEntry) {
      throw new Error(
        "Cannot log without a hard work entry to a career improvement client"
      );
    }
    this.checkForDuplicate(hardWorkEntry);

    let insertionIndex = this.hardWorkEntries.length;
    for (let i = 0; i < this.hardWorkEntries.length; i++) {
      if (!hardWorkEntry.isAfter(this.hardWorkEntries[i])) {
        insertionIndex = i;
        break;
      }
    }

    this.hardWorkEntries.splice(insertionIndex, 0, hardWorkEntry.copy());
    this.emitOnLogEvent(hardWorkEntry.copy());
  }

  emitOnLogEvent(hardWorkEntry) {
    for (let i = 0; i < this.onLogAddListeners.length; i++) {
      const listener = this.onLogAddListeners[i];
      listener.onLog(new OnLogEvent(hardWorkEntry, this));
    }
  }

  addOnLogListener(listener) {
    if (!listener) {
      throw new Error("Cannot add a listener that does not exist");
    }

    this.onLogAddListeners.push(listener);
  }

  checkForDuplicate(toCheck) {
    if (this.contains(toCheck)) {
      throw new Error("Cannot add the same hard work entry twice");
    }
  }

  remove(hardWorkEntry) {

    let deletionIndex = -1;
    for (let i = 0; i < this.hardWorkEntries.length; i++) {
      if (hardWorkEntry.equals(this.hardWorkEntries[i])) {
        deletionIndex = i;
        break;
      }
    }

    this.hardWorkEntries.splice(deletionIndex, 1);
    this.emitOnLogRemovedEvent(hardWorkEntry);
  }

  emitOnLogRemovedEvent(hardWorkEntry) {
    for (let i = 0; i < this.onLogRemovedListeners.length; i++) {
      const listener = this.onLogRemovedListeners[i];
      listener.onLogRemoved(new OnLogRemovedEvent(hardWorkEntry, this));
    }
  }

  addOnLogRemovedListener(listener) {
    this.onLogRemovedListeners.push(listener);
  }

  getHardWork() {
    return this.hardWorkEntries.slice();
  }

  getAchievements(fromTimestamp, toTimestamp) {
    const withinBoundary = [];

    const achievements = this.getHardWork();
    for (let i = 0; i < achievements.length; i++) {
      const achievement = achievements[i];

      if (
        fromTimestamp.isBefore(achievement.getAccomplishedOn()) &&
        toTimestamp.isAfter(achievement.getAccomplishedOn())
      ) {
        withinBoundary.push(achievement.copy());
      }
    }

    return withinBoundary;
  }

  getEarliestAchievement() {
    const achievements = this.getHardWork();

    let earliestAchievement = null;
    for (let i = 0; i < achievements.length; i++) {
      const achievement = achievements[i];

      if (!earliestAchievement) {
        earliestAchievement = achievement;
      } else if (achievement.isBefore(earliestAchievement)) {
        earliestAchievement = achievement;
      }
    }

    return earliestAchievement;
  }

  getLatestAchievement() {
    const achievements = this.getHardWork();

    let latestAchievement = null;
    for (let i = 0; i < achievements.length; i++) {
      const achievement = achievements[i];

      if (!latestAchievement) {
        latestAchievement = achievement;
      } else if (achievement.isAfter(latestAchievement)) {
        latestAchievement = achievement;
      }
    }

    return latestAchievement;
  }
}
