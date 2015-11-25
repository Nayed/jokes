<?php

namespace App\Http\Controllers;

use Response;
use Illuminate\Http\Request;
use App\Joke;
use App\User;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class JokesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $jokes = Joke::all();
        return Response::json([
            'data' => $this->transformCollection($jokes)
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if(!$request->body || !$request->user_id) {
            return Response::json([
                'error' => [
                    'message' => 'Please provide both body and user_id'
                ]
            ], 422);
        }

        $joke = Joke::create($request->all());

        return Response::json([
            'message' => 'Joke created successfully',
            'data' => $this->transform($joke)
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $joke = Joke::with(
            array('User' => function($query) {
                $query->select('id', 'name');
            })
        )->find($id);

        if(!$joke) {
            return Response::json([
                'error' => [
                    'message' => 'Joke does not exist'
                ]
            ], 404);
        }

        // get previous joke id
        $previous = Joke::where('id', '<', $joke->id)->max('id');

        // get next joke id
        $next = Joke::where('id', '>', $joke->id)->min('id');

        return Response::json([
            'previous_joke_id' => $previous,
            'next_joke_id' => $next,
            'data' => $this->transform($joke)
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if(!$request->body || $request->user_id) {
            return Response::json([
                'error' => [
                    'message' => 'Please provide both body and user_id'
                ]
            ], 422);
        }

        $joke = Joke::find($id);
        $joke->body = $request->body;
        $joke->user_id = $request->user_id;
        $joke->save();

        return Response::json([
            'message' => 'Joke updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Joke::destroy($id);
    }

    private function transformCollection($jokes)
    {
        return array_map([$this, 'transform'], $jokes->toArray());
    }

    private function transform($joke)
    {
        return [
            'joke_id' => $joke['id'],
            'joke' => $joke['body'],
            'submitted_by' => $joke['user']['name']
        ];
    }
}
