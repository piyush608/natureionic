import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LocalService {
  constructor() {}

  getTimeDifference(date) {
    let originalDate = new Date(date);
    let endDate = new Date();

    if (
      (endDate.getTime() - originalDate.getTime()) / (1000 * 60 * 60 * 24) >=
      1
    ) {
      if (
        (endDate.getTime() - originalDate.getTime()) /
          (1000 * 60 * 60 * 24 * 7) >=
        1
      ) {
        if (
          (endDate.getTime() - originalDate.getTime()) /
            (1000 * 60 * 60 * 24 * 30) >=
          1
        ) {
          return (
            parseInt(
              (
                (endDate.getTime() - originalDate.getTime()) /
                (1000 * 60 * 60 * 24 * 30)
              ).toString()
            ) + "m ago"
          );
        } else {
          return (
            parseInt(
              (
                (endDate.getTime() - originalDate.getTime()) /
                (1000 * 60 * 60 * 24 * 7)
              ).toString()
            ) + "w ago"
          );
        }
      } else {
        return (
          parseInt(
            (
              (endDate.getTime() - originalDate.getTime()) /
              (1000 * 60 * 60 * 24)
            ).toString()
          ) + "d ago"
        );
      }
    } else {
      if (
        (endDate.getTime() - originalDate.getTime()) / (1000 * 60 * 60) >=
        1
      ) {
        return (
          parseInt(
            (
              (endDate.getTime() - originalDate.getTime()) /
              (1000 * 60 * 60)
            ).toString()
          ) + "h ago"
        );
      } else {
        if ((endDate.getTime() - originalDate.getTime()) / (1000 * 60) >= 1) {
          return (
            parseInt(
              (
                (endDate.getTime() - originalDate.getTime()) /
                (1000 * 60)
              ).toString()
            ) + "m ago"
          );
        } else {
          if ((endDate.getTime() - originalDate.getTime()) / 1000 >= 1) {
            return (
              parseInt(
                ((endDate.getTime() - originalDate.getTime()) / 1000).toString()
              ) + "s ago"
            );
          }
        }
      }
    }
  }
}
