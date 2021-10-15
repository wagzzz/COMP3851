package com.example.authentication.model;

import com.example.authentication.entity.CoursePlan;
import com.example.authentication.entity.Restraint;

import java.util.List;

public class DegreePlanDetail {

    public List<CoursePlan> coursePlans;
    public List<Restraint> restraints;

    public DegreePlanDetail(List<CoursePlan> coursePlans, List<Restraint> restraints) {
        this.coursePlans = coursePlans;
        this.restraints = restraints;
    }
}
