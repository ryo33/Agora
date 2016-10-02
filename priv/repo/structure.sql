--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE accounts (
    id integer NOT NULL,
    provider character varying(255),
    provided_id character varying(255),
    name character varying(255),
    inserted_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE accounts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE accounts_id_seq OWNED BY accounts.id;


--
-- Name: groups; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE groups (
    id integer NOT NULL,
    name character varying(255),
    account_id integer,
    user_id integer,
    parent_group_id integer,
    inserted_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    group_limited boolean,
    thread_limited boolean,
    join_limited boolean,
    read_limited boolean
);


--
-- Name: groups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE groups_id_seq OWNED BY groups.id;


--
-- Name: members; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE members (
    id integer NOT NULL,
    account_id integer,
    user_id integer,
    group_id integer,
    inserted_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: members_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE members_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE members_id_seq OWNED BY members.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE posts (
    id integer NOT NULL,
    title character varying(255),
    text character varying(255),
    account_id integer,
    user_id integer,
    thread_id integer,
    post_id integer,
    inserted_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE posts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE posts_id_seq OWNED BY posts.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp without time zone
);


--
-- Name: thread_users; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE thread_users (
    id integer NOT NULL,
    user_id integer,
    group_id integer,
    inserted_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: thread_users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE thread_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: thread_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE thread_users_id_seq OWNED BY thread_users.id;


--
-- Name: threads; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE threads (
    id integer NOT NULL,
    title character varying(255),
    account_id integer,
    user_id integer,
    parent_group_id integer,
    inserted_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    post_limited boolean,
    read_limited boolean
);


--
-- Name: threads_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE threads_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: threads_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE threads_id_seq OWNED BY threads.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE users (
    id integer NOT NULL,
    uid character varying(255),
    name character varying(255),
    account_id integer,
    inserted_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: watchgroups; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE watchgroups (
    id integer NOT NULL,
    account_id integer,
    user_id integer,
    watchlist_id integer,
    group_id integer,
    inserted_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: watchgroups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE watchgroups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: watchgroups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE watchgroups_id_seq OWNED BY watchgroups.id;


--
-- Name: watchlists; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE watchlists (
    id integer NOT NULL,
    name character varying(255),
    account_id integer,
    user_id integer,
    inserted_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: watchlists_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE watchlists_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: watchlists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE watchlists_id_seq OWNED BY watchlists.id;


--
-- Name: watchthreads; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE watchthreads (
    id integer NOT NULL,
    account_id integer,
    user_id integer,
    watchlist_id integer,
    thread_id integer,
    inserted_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: watchthreads_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE watchthreads_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: watchthreads_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE watchthreads_id_seq OWNED BY watchthreads.id;


--
-- Name: watchusers; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE watchusers (
    id integer NOT NULL,
    account_id integer,
    user_id integer,
    watchlist_id integer,
    target_user_id integer,
    inserted_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: watchusers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE watchusers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: watchusers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE watchusers_id_seq OWNED BY watchusers.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY accounts ALTER COLUMN id SET DEFAULT nextval('accounts_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY groups ALTER COLUMN id SET DEFAULT nextval('groups_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY members ALTER COLUMN id SET DEFAULT nextval('members_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY posts ALTER COLUMN id SET DEFAULT nextval('posts_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY thread_users ALTER COLUMN id SET DEFAULT nextval('thread_users_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY threads ALTER COLUMN id SET DEFAULT nextval('threads_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY watchgroups ALTER COLUMN id SET DEFAULT nextval('watchgroups_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY watchlists ALTER COLUMN id SET DEFAULT nextval('watchlists_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY watchthreads ALTER COLUMN id SET DEFAULT nextval('watchthreads_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY watchusers ALTER COLUMN id SET DEFAULT nextval('watchusers_id_seq'::regclass);


--
-- Name: accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- Name: groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);


--
-- Name: members_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY members
    ADD CONSTRAINT members_pkey PRIMARY KEY (id);


--
-- Name: posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: thread_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY thread_users
    ADD CONSTRAINT thread_users_pkey PRIMARY KEY (id);


--
-- Name: threads_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY threads
    ADD CONSTRAINT threads_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: watchgroups_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY watchgroups
    ADD CONSTRAINT watchgroups_pkey PRIMARY KEY (id);


--
-- Name: watchlists_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY watchlists
    ADD CONSTRAINT watchlists_pkey PRIMARY KEY (id);


--
-- Name: watchthreads_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY watchthreads
    ADD CONSTRAINT watchthreads_pkey PRIMARY KEY (id);


--
-- Name: watchusers_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY watchusers
    ADD CONSTRAINT watchusers_pkey PRIMARY KEY (id);


--
-- Name: groups_account_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX groups_account_id_index ON groups USING btree (account_id);


--
-- Name: groups_parent_group_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX groups_parent_group_id_index ON groups USING btree (parent_group_id);


--
-- Name: groups_user_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX groups_user_id_index ON groups USING btree (user_id);


--
-- Name: members_account_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX members_account_id_index ON members USING btree (account_id);


--
-- Name: members_group_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX members_group_id_index ON members USING btree (group_id);


--
-- Name: members_user_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX members_user_id_index ON members USING btree (user_id);


--
-- Name: posts_account_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX posts_account_id_index ON posts USING btree (account_id);


--
-- Name: posts_post_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX posts_post_id_index ON posts USING btree (post_id);


--
-- Name: posts_thread_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX posts_thread_id_index ON posts USING btree (thread_id);


--
-- Name: posts_user_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX posts_user_id_index ON posts USING btree (user_id);


--
-- Name: thread_users_group_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX thread_users_group_id_index ON thread_users USING btree (group_id);


--
-- Name: thread_users_user_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX thread_users_user_id_index ON thread_users USING btree (user_id);


--
-- Name: threads_account_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX threads_account_id_index ON threads USING btree (account_id);


--
-- Name: threads_parent_group_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX threads_parent_group_id_index ON threads USING btree (parent_group_id);


--
-- Name: threads_user_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX threads_user_id_index ON threads USING btree (user_id);


--
-- Name: users_account_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX users_account_id_index ON users USING btree (account_id);


--
-- Name: users_uid_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE UNIQUE INDEX users_uid_index ON users USING btree (uid);


--
-- Name: watchgroups_account_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX watchgroups_account_id_index ON watchgroups USING btree (account_id);


--
-- Name: watchgroups_group_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX watchgroups_group_id_index ON watchgroups USING btree (group_id);


--
-- Name: watchgroups_user_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX watchgroups_user_id_index ON watchgroups USING btree (user_id);


--
-- Name: watchgroups_watchlist_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX watchgroups_watchlist_id_index ON watchgroups USING btree (watchlist_id);


--
-- Name: watchlists_account_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX watchlists_account_id_index ON watchlists USING btree (account_id);


--
-- Name: watchlists_user_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX watchlists_user_id_index ON watchlists USING btree (user_id);


--
-- Name: watchthreads_account_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX watchthreads_account_id_index ON watchthreads USING btree (account_id);


--
-- Name: watchthreads_thread_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX watchthreads_thread_id_index ON watchthreads USING btree (thread_id);


--
-- Name: watchthreads_user_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX watchthreads_user_id_index ON watchthreads USING btree (user_id);


--
-- Name: watchthreads_watchlist_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX watchthreads_watchlist_id_index ON watchthreads USING btree (watchlist_id);


--
-- Name: watchusers_account_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX watchusers_account_id_index ON watchusers USING btree (account_id);


--
-- Name: watchusers_target_user_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX watchusers_target_user_id_index ON watchusers USING btree (target_user_id);


--
-- Name: watchusers_user_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX watchusers_user_id_index ON watchusers USING btree (user_id);


--
-- Name: watchusers_watchlist_id_index; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX watchusers_watchlist_id_index ON watchusers USING btree (watchlist_id);


--
-- Name: groups_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY groups
    ADD CONSTRAINT groups_account_id_fkey FOREIGN KEY (account_id) REFERENCES accounts(id);


--
-- Name: groups_parent_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY groups
    ADD CONSTRAINT groups_parent_group_id_fkey FOREIGN KEY (parent_group_id) REFERENCES groups(id);


--
-- Name: groups_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY groups
    ADD CONSTRAINT groups_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: members_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY members
    ADD CONSTRAINT members_account_id_fkey FOREIGN KEY (account_id) REFERENCES accounts(id);


--
-- Name: members_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY members
    ADD CONSTRAINT members_group_id_fkey FOREIGN KEY (group_id) REFERENCES groups(id);


--
-- Name: members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY members
    ADD CONSTRAINT members_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: posts_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY posts
    ADD CONSTRAINT posts_account_id_fkey FOREIGN KEY (account_id) REFERENCES accounts(id);


--
-- Name: posts_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY posts
    ADD CONSTRAINT posts_post_id_fkey FOREIGN KEY (post_id) REFERENCES posts(id);


--
-- Name: posts_thread_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY posts
    ADD CONSTRAINT posts_thread_id_fkey FOREIGN KEY (thread_id) REFERENCES threads(id);


--
-- Name: posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: thread_users_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY thread_users
    ADD CONSTRAINT thread_users_group_id_fkey FOREIGN KEY (group_id) REFERENCES groups(id);


--
-- Name: thread_users_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY thread_users
    ADD CONSTRAINT thread_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: threads_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY threads
    ADD CONSTRAINT threads_account_id_fkey FOREIGN KEY (account_id) REFERENCES accounts(id);


--
-- Name: threads_parent_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY threads
    ADD CONSTRAINT threads_parent_group_id_fkey FOREIGN KEY (parent_group_id) REFERENCES groups(id);


--
-- Name: threads_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY threads
    ADD CONSTRAINT threads_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: users_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_account_id_fkey FOREIGN KEY (account_id) REFERENCES accounts(id);


--
-- Name: watchgroups_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY watchgroups
    ADD CONSTRAINT watchgroups_account_id_fkey FOREIGN KEY (account_id) REFERENCES accounts(id);


--
-- Name: watchgroups_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY watchgroups
    ADD CONSTRAINT watchgroups_group_id_fkey FOREIGN KEY (group_id) REFERENCES groups(id);


--
-- Name: watchgroups_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY watchgroups
    ADD CONSTRAINT watchgroups_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: watchgroups_watchlist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY watchgroups
    ADD CONSTRAINT watchgroups_watchlist_id_fkey FOREIGN KEY (watchlist_id) REFERENCES watchlists(id);


--
-- Name: watchlists_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY watchlists
    ADD CONSTRAINT watchlists_account_id_fkey FOREIGN KEY (account_id) REFERENCES accounts(id);


--
-- Name: watchlists_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY watchlists
    ADD CONSTRAINT watchlists_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: watchthreads_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY watchthreads
    ADD CONSTRAINT watchthreads_account_id_fkey FOREIGN KEY (account_id) REFERENCES accounts(id);


--
-- Name: watchthreads_thread_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY watchthreads
    ADD CONSTRAINT watchthreads_thread_id_fkey FOREIGN KEY (thread_id) REFERENCES threads(id);


--
-- Name: watchthreads_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY watchthreads
    ADD CONSTRAINT watchthreads_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: watchthreads_watchlist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY watchthreads
    ADD CONSTRAINT watchthreads_watchlist_id_fkey FOREIGN KEY (watchlist_id) REFERENCES watchlists(id);


--
-- Name: watchusers_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY watchusers
    ADD CONSTRAINT watchusers_account_id_fkey FOREIGN KEY (account_id) REFERENCES accounts(id);


--
-- Name: watchusers_target_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY watchusers
    ADD CONSTRAINT watchusers_target_user_id_fkey FOREIGN KEY (target_user_id) REFERENCES users(id);


--
-- Name: watchusers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY watchusers
    ADD CONSTRAINT watchusers_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: watchusers_watchlist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY watchusers
    ADD CONSTRAINT watchusers_watchlist_id_fkey FOREIGN KEY (watchlist_id) REFERENCES watchlists(id);


--
-- PostgreSQL database dump complete
--

INSERT INTO "schema_migrations" (version) VALUES (20160429162143), (20160429162831), (20160429163047), (20160429163300), (20160429163628), (20160919115416), (20160919120646), (20160919120716), (20160919121002), (20160922113942), (20160930123159);

