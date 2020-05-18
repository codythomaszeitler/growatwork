import { Goal } from "../pojo/goal";

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

class OnAssociationEvent {
  constructor(goal, accomplishment) {
    this.goal = goal;
    this.accomplishment = accomplishment;
  }
}

export const getUnassociated = new Goal("Unassociated");

export class CareerImprovementClient {
  constructor(email, username) {
    this.hardWorkEntries = [];
    this.goals = [];
    this.type = CareerImprovementClient.getType();
    this.email = email;
    this.username = username;
    this.id = null;

    this.onLogAddListeners = [];
    this.onLogRemovedListeners = [];
    this.onGoalAddedListeners = [];
    this.onGoalRemovedListeners = [];
    this.onGoalModifiedListeners = [];
    this.onAccomplishmentAssociatedListeners = [];
    this.onAccomplishmentDeassociatedListeners = [];
    this.currentOnLogListenerId = 0;
    this.currentOnLogRemoveListenerId = 0;
    this.currentOnGoalAddedListenerId = 0;
    this.currentOnGoalRemovedListenerId = 0;
    this.currentOnAccomplishmentAssociatedListenerId = 0;
    this.currentOnAccomplishmentDeassociatedListenerId = 0;
  }

  static getType() {
    return "careerimprovementclient";
  }

  getUsername() {
    return this.username;
  }

  getEmail() {
    return this.email;
  }

  hasGoal(goal) {
    let hasGoal = false;

    for (let i = 0; i < this.goals.length; i++) {
      if (this.goals[i].get() === goal.get()) {
        hasGoal = true;
        break;
      }
    }

    return hasGoal;
  }

  addGoal(goal) {
    if (this.hasGoal(goal)) {
      throw new Error("The goal [" + goal.get() + "] has already been added");
    }

    this.goals.push(goal.copy());
    for (let i = 0; i < this.onGoalAddedListeners.length; i++) {
      this.onGoalAddedListeners[i].onGoalAdded({
        goal: goal.copy(),
      });
    }
  }

  addOnGoalAddedListener(listener) {
    this.onGoalAddedListeners.push(listener);
    listener.__onGoalAddedListenerId = this.currentOnGoalAddedListenerId;
    this.currentOnGoalAddedListenerId = this.currentOnGoalAddedListenerId + 1;
  }

  removeOnGoalAddedListener(listener) {
    this.onGoalAddedListeners = this.onGoalAddedListeners.filter(function (
      registered
    ) {
      return (
        registered.__onGoalAddedListenerId !== listener.__onGoalAddedListenerId
      );
    });
  }

  removeGoal(goal) {
    const ref = this.getGoalByRef(goal.get());
    this.goals = this.goals.filter(function (inner) {
      return goal.get() !== inner.get();
    });

    this.emitOnGoalRemovedEvent(ref);
    const toDeassociate = ref.getAssociatedAccomplishments();
    for (let i = 0; i < toDeassociate.length; i++) {
      this.emitOnAccomplishmentDeassociatedEvent(goal, toDeassociate[i]);
    }
  }

  emitOnGoalRemovedEvent(goal) {
    for (let i = 0; i < this.onGoalRemovedListeners.length; i++) {
      this.onGoalRemovedListeners[i].onGoalRemoved({
        goal: goal,
      });
    }
  }

  addOnGoalRemovedListener(listener) {
    this.onGoalRemovedListeners.push(listener);
    listener.__onGoalRemovedListenerId = this.currentOnGoalRemovedListenerId;
    this.currentOnGoalRemovedListenerId++;
  }

  removeOnGoalRemovedListener(listener) {
    this.onGoalRemovedListeners = this.onGoalRemovedListeners.filter(function (
      inner
    ) {
      return (
        listener.__onGoalRemovedListenerId !== inner.__onGoalRemovedListenerId
      );
    });
  }

  getGoalWithAccomplishment(accomplishment) {
    let found = null;
    for (let i = 0; i < this.goals.length; i++) {
      if (this.goals[i].hasAccomplishment(accomplishment)) {
        found = this.goals[i].copy();
        break;
      }
    }
    return found;
  }

  getGoal(goal) {
    const getGoalName = () => {
      let goalName;
      if (typeof goal === "string") {
        goalName = goal;
      } else {
        goalName = goal.get();
      }
      return goalName;
    };

    let found = null;

    for (let i = 0; i < this.goals.length; i++) {
      if (this.goals[i].get() === getGoalName()) {
        found = this.goals[i].copy();
        break;
      }
    }

    return found;
  }

  getGoals() {
    const goals = [];

    for (let i = 0; i < this.goals.length; i++) {
      goals.push(this.goals[i].copy());
    }

    return goals;
  }

  hasGoals() {
    return this.goals.length !== 0;
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

  log(hardWorkEntry, associatedGoal) {
    if (!hardWorkEntry) {
      throw new Error(
        "Cannot log without a hard work entry to a career improvement client"
      );
    }

    console.log('enter checking for duplicate');
    this.checkForDuplicate(hardWorkEntry);
    console.log('leaving checking for duplicate');

    let insertionIndex = this.hardWorkEntries.length;
    for (let i = 0; i < this.hardWorkEntries.length; i++) {
      if (!hardWorkEntry.isAfter(this.hardWorkEntries[i])) {
        insertionIndex = i;
        break;
      }
    }

    this.hardWorkEntries.splice(insertionIndex, 0, hardWorkEntry.copy());
    if (associatedGoal) {
      const ref = this.getGoalByRef(associatedGoal.get());
      if (!ref) {
        throw new Error("Goal [" + associatedGoal.get() + "] was not found");
      }

      ref.associate(hardWorkEntry);
      this.emitOnAccomplishmentAssociatedEvent(ref, hardWorkEntry);
    }

    this.emitOnLogEvent(hardWorkEntry.copy());
  }

  getGoalByRef(goalName) {
    let ref = null;
    for (let i = 0; i < this.goals.length; i++) {
      if (this.goals[i].get() === goalName) {
        ref = this.goals[i];
      }
    }
    return ref;
  }

  emitOnAccomplishmentAssociatedEvent(goal, accomplishment) {
    for (let i = 0; i < this.onAccomplishmentAssociatedListeners.length; i++) {
      const listener = this.onAccomplishmentAssociatedListeners[i];
      listener.onAccomplishmentAssociated(
        new OnAssociationEvent(goal, accomplishment)
      );
    }
  }

  emitOnLogEvent(hardWorkEntry) {
    for (let i = 0; i < this.onLogAddListeners.length; i++) {
      const listener = this.onLogAddListeners[i];
      listener.onLog(new OnLogEvent(hardWorkEntry, this));
    }
  }

  addOnAccomplishmentAssociatedListener(listener) {
    this.onAccomplishmentAssociatedListeners.push(listener);
    listener.__onAccomplishmentAssociatedListenerId = this.currentOnAccomplishmentAssociatedListenerId;
    this.currentOnAccomplishmentAssociatedListenerId++;
  }

  removeOnAccomplishmentAssociatedListener(listener) {
    this.onAccomplishmentAssociatedListeners = this.onAccomplishmentAssociatedListeners.filter(
      function (inner) {
        return (
          listener.__onAccomplishmentAssociatedListenerId !==
          inner.__onAccomplishmentAssociatedListenerId
        );
      }
    );
  }

  addOnLogListener(listener) {
    if (!listener) {
      throw new Error("Cannot add a listener that does not exist");
    }

    listener.__onLogListenerId = this.currentOnLogListenerId;
    this.currentOnLogListenerId++;
    this.onLogAddListeners.push(listener);
  }

  removeOnLogListener(listener) {
    this.onLogAddListeners = this.onLogAddListeners.filter(function (
      registered
    ) {
      return registered.__onLogListenerId !== listener.__onLogListenerId;
    });
  }

  checkForDuplicate(toCheck) {
    if (this.contains(toCheck)) {
      throw new Error("Cannot add the same hard work entry twice");
    }
  }

  remove(hardWorkEntry) {
    if (!this.contains(hardWorkEntry)) {
      throw new Error(
        "Could not find accomplishment [" +
          hardWorkEntry.getAccomplishment() +
          "]"
      );
    }

    let deletionIndex = -1;
    for (let i = 0; i < this.hardWorkEntries.length; i++) {
      if (hardWorkEntry.equals(this.hardWorkEntries[i])) {
        deletionIndex = i;
        break;
      }
    }

    for (let i = 0; i < this.goals.length; i++) {
      if (this.goals[i].hasAccomplishment(hardWorkEntry)) {
        this.goals[i].remove(hardWorkEntry);
        this.emitOnAccomplishmentDeassociatedEvent(
          this.goals[i],
          hardWorkEntry
        );
      }
    }

    this.hardWorkEntries.splice(deletionIndex, 1);
    this.emitOnLogRemovedEvent(hardWorkEntry);
  }

  emitOnAccomplishmentDeassociatedEvent(goal, accomplishment) {
    for (
      let i = 0;
      i < this.onAccomplishmentDeassociatedListeners.length;
      i++
    ) {
      this.onAccomplishmentDeassociatedListeners[
        i
      ].onAccomplishmentDeassociated({
        goal: goal,
        accomplishment: accomplishment,
      });
    }
  }

  addOnAccomplishmentDeassociatedListener(listener) {
    this.onAccomplishmentDeassociatedListeners.push(listener);
    listener.__onAccomplishmentDeassociatedListenerId = this.currentOnAccomplishmentDeassociatedListenerId;
    this.currentOnAccomplishmentDeassociatedListenerId++;
  }

  removeOnAccomplishmentDeassociatedListener(listener) {
    this.onAccomplishmentDeassociatedListeners = this.onAccomplishmentDeassociatedListeners.filter(
      function (inner) {
        return (
          inner.__onAccomplishmentDeassociatedListenerId !==
          listener.__onAccomplishmentDeassociatedListenerId
        );
      }
    );
  }

  emitOnLogRemovedEvent(hardWorkEntry) {
    for (let i = 0; i < this.onLogRemovedListeners.length; i++) {
      const listener = this.onLogRemovedListeners[i];
      listener.onLogRemoved(new OnLogRemovedEvent(hardWorkEntry, this));
    }
  }

  addOnLogRemovedListener(listener) {
    listener.__onLogRemovedListenerId = this.currentOnLogRemoveListenerId;
    this.currentOnLogRemoveListenerId++;
    this.onLogRemovedListeners.push(listener);
  }

  removeOnLogRemovedListener(listener) {
    this.onLogRemovedListeners = this.onLogRemovedListeners.filter(function (
      registered
    ) {
      return (
        listener.__onLogRemovedListenerId !==
        registered.__onLogRemovedListenerId
      );
    });
  }

  getHardWork() {
    return this.hardWorkEntries.slice();
  }

  getAchievements(fromTimestamp, toTimestamp, selectByGoals) {
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

    const goalsContainsAccomplishment = (goals, accomplishment) => {
      if (!goals) {
        return true;
      }

      if (goals.length === 0) {
        return true;
      }

      goals = goals.filter(function (goal) {
        return goal.get() !== getUnassociated.get();
      });

      let isWithin = false;
      for (let i = 0; i < goals.length; i++) {
        const byRef = this.getGoalByRef(goals[i].get());
        if (byRef.hasAccomplishment(accomplishment)) {
          isWithin = true;
          break;
        }
      }
      return isWithin;
    };

    const containsUnassociated = (goals) => {
      let containsUnassociated = false;
      for (let i = 0; i < goals.length; i++) {
        if (goals[i].get() === getUnassociated.get()) {
          containsUnassociated = true;
          break;
        }
      }
      return containsUnassociated;
    };

    const filtered = [];

    for (let i = 0; i < withinBoundary.length; i++) {
      if (goalsContainsAccomplishment(selectByGoals, withinBoundary[i])) {
        filtered.push(withinBoundary[i]);
      } else if (containsUnassociated(selectByGoals)) {
        if (!this.getAssociatedGoal(withinBoundary[i])) {
          filtered.push(withinBoundary[i]);
        }
      }
    }

    return filtered;
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

  getAssociatedGoal(accomplishment) {
    if (!this.contains(accomplishment)) {
      throw new Error(
        "Accomplishment [" +
          accomplishment.getAccomplishment() +
          "] did not exist within client"
      );
    }

    let associated = null;

    const goals = this.getGoals();
    for (let i = 0; i < goals.length; i++) {
      if (goals[i].hasAccomplishment(accomplishment)) {
        associated = goals[i].copy();
        break;
      }
    }

    return associated;
  }
}
