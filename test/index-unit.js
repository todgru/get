"use strict";

const test = require("ava");
const get = require("../index");

test.before(t => {
  t.context.object = {
    a: ".a",
    b: ".b",
    c: {
      c: { a: { a: ".c.c.a.a" } },
      a: ".c.a",
      b: ".c.b"
    },
    d: {
      e: [{ a: "a" }, { b: "b" }]
    }
  };
});

test("returns value from object", t => {
  const { object } = t.context;
  t.is(get(object, "b"), ".b");
  t.is(get(object, "a"), ".a");
  t.is(get(object, "c.a"), ".c.a");
  t.deepEqual(get(object, "c.c.a"), { a: ".c.c.a.a" });
  t.is(get(object, "c.c.a.a"), ".c.c.a.a");
});

test("returns default value when key not found", t => {
  const { object } = t.context;
  t.is(get(object, "w"), undefined);
  t.is(get(object, "c.a.x"), undefined);
  t.is(get(object, "c.a.x", "fake"), "fake");
});

test("returns expected value from object array", t => {
  const { object } = t.context;
  t.is(get(object, "d.e[1]b"), "b");
  t.is(get(object, "d.e[2]b"), undefined);
  t.is(get(object, "d.e[3]b", "fake"), "fake");
});

test("array only test", t => {
  const expectedValue = "pick me";
  const arr = [, , [, [[expectedValue], ,]], ,];
  const path = "[2][1][0][0]";
  t.is(get(arr, path), expectedValue);
});
